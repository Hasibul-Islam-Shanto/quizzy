import { ClerkProvider } from '@clerk/nextjs';

const ClerkGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkGlobalProvider;
