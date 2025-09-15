import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/config/db.config';

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || 'no-email',
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      avatarUrl: user.imageUrl || '',
    },
  });
  return newUser;
};
