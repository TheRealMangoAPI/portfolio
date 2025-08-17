"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
