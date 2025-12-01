import { useEffect, useState } from "react";
import Loading from "../common/loading";
import useAuthCheck from "@/hooks/use-auth-check";

const AuthCom = ({ children }: { children: React.ReactNode }) => {
  const { authChecked } = useAuthCheck();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Always render loading on server and initial client render
  if (!isClient || !authChecked) {
    return (
      <div className="flex items-center justify-center h-screen" suppressHydrationWarning>
        <Loading spinner="fade" loading={true} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthCom;
