"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  console.log("Current Resolved Theme:", resolvedTheme);
  const [mounted, setMounted] = useState(false);

  // This prevents the "Hydration Mismatch" and ensures
  // the theme is actually read from the browser.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <SignUp
        key={resolvedTheme} // 👈 THIS LINE FIXES IT
        appearance={{
          baseTheme: resolvedTheme === "light" ? dark : undefined,
          variables: {
            colorPrimary: "#7c3aed",
          },
        }}
      />
    </div>

   
  );
}
