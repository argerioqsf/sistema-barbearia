import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const useHandlerRouter = () => {
  const router = useRouter();
  const paths = usePathname();
  const pushRouter = (path?: string) => {
    const pathNames = paths.split("/").filter((path) => path);
    return router.push(`/${pathNames[0]}/${path}`);
  };
  return { pushRouter };
};
