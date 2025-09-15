'use client';
import { SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';

const LoginButton = () => {
  return (
    <SignInButton>
      <Button variant="hero" size="sm" className="cursor-pointer">
        Login
      </Button>
    </SignInButton>
  );
};

export default LoginButton;
