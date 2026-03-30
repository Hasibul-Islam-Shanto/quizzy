import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/config/db.config';

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const primaryEmail =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null;

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (existingUser) {
    return prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: primaryEmail,
        name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'User',
        avatarUrl: user.imageUrl || '',
      },
    });
  }

  const newUser = await prisma.user.create({
    data: {
      id: user.id,
      email: primaryEmail,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'User',
      avatarUrl: user.imageUrl || '',
    },
  });
  return newUser;
};
