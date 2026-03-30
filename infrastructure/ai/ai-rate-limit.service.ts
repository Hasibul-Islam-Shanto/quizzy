import 'server-only';

import prisma from '@/config/db.config';
import { Prisma } from '@prisma/client';
import { createHash } from 'node:crypto';

const AI_WINDOW_MINUTES = 10;
const MAX_REQUESTS_PER_USER_WINDOW = 5;
const MAX_REQUESTS_PER_IP_WINDOW = 10;

const getWindowStart = () =>
  new Date(Date.now() - AI_WINDOW_MINUTES * 60 * 1_000);

export const hashIpAddress = (ipAddress: string) =>
  createHash('sha256').update(ipAddress).digest('hex');

export const reserveAiGenerationCapacity = async ({
  userId,
  ipAddress,
  promptChars,
  numQuestions,
}: {
  userId: string;
  ipAddress: string | null;
  promptChars: number;
  numQuestions: number;
}) => {
  const ipHash = ipAddress ? hashIpAddress(ipAddress) : null;
  const windowStart = getWindowStart();

  await prisma.$transaction(
    async tx => {
      const [userRequestCount, ipRequestCount] = await Promise.all([
        tx.aiGenerationRequest.count({
          where: {
            userId,
            createdAt: { gte: windowStart },
          },
        }),
        ipHash
          ? tx.aiGenerationRequest.count({
              where: {
                ipHash,
                createdAt: { gte: windowStart },
              },
            })
          : Promise.resolve(0),
      ]);

      if (userRequestCount >= MAX_REQUESTS_PER_USER_WINDOW) {
        throw new Error(
          'AI generation rate limit exceeded for this account. Please try again later.',
        );
      }

      if (ipHash && ipRequestCount >= MAX_REQUESTS_PER_IP_WINDOW) {
        throw new Error(
          'AI generation rate limit exceeded for this network. Please try again later.',
        );
      }

      await tx.aiGenerationRequest.create({
        data: {
          userId,
          ipHash,
          promptChars,
          numQuestions,
        },
      });
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    },
  );
};
