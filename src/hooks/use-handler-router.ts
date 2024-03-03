import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const useHandlerRouter = () => {
  const router = useRouter();
  const paths = usePathname();
  const pushRouter = (path?: string) => {
    const pathNames = paths.split("/").filter((path) => path);
    return router.push(`/${pathNames[0]}/${path}`);
  };
  const generatePath = (path?: string) => {
    const pathNames = paths.split("/").filter((path) => path);
    const newPath = `/${pathNames[0]}/${path}`;
    console.log("newPath: ", newPath);
    return newPath;
  };
  return { pushRouter, generatePath };
};
