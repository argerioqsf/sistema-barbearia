import SingIn from "@/components/template/SingIn";
import { ParamsProp } from "@/types/general";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp;
}) {
  const meta = await getTranslations({
    locale,
    namespace: "metadata.auth.signin",
  });
  return {
    title: meta("title"),
    description: meta("description"),
  };
}

const Page = () => {
  return <SingIn />;
};

export default Page;
