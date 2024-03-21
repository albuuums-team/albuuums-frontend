"use client";

import { SessionProvider } from "next-auth/react";
import { FunctionComponent, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FunctionComponent<ProvidersProps> = (props) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};
