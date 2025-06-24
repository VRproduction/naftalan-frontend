"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavigationLoading from "@/components/ui/loading/NavigationLoading";

export default function LoadingProvider({ 
  children,
  excludePaths = ['/google/callback', '/dashboard']
}: { 
  children: React.ReactNode,
  excludePaths?: string[]
}) {
  const [navigationLoading, setNavigationLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const originalPush = router.push;
  const originalReplace = router.replace;
  const isExcludedPath = excludePaths.some(path => pathname.startsWith(path));

  useEffect(() => {
    router.push = (...args) => {
      setNavigationLoading(true);
      return originalPush.apply(router, args);
    };

    router.replace = (...args) => {
      setNavigationLoading(true);
      return originalReplace.apply(router, args);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router, originalPush, originalReplace]);

  useEffect(() => {
    const timeout = setTimeout(() => setNavigationLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {!isExcludedPath && navigationLoading && <NavigationLoading />}
      {children}
    </>
  );
}