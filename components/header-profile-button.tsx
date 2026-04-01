'use client';
import LoginButton from '@/components/login-button';
import { SignedOut, UserButton } from '@clerk/nextjs';

const HeaderProfileButton = () => {
  return (
    <>
      <UserButton />
      <SignedOut>
        <LoginButton />
      </SignedOut>
    </>
  );
};

export default HeaderProfileButton;
