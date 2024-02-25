import Home from "@/components/template/Home";
import ListUnits from "@/components/template/ListUnits";
import ListUsers from "@/components/template/ListUsers";
import Profile from "@/components/template/Profile";
import { ParamsProp } from "@/types/general";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp;
}) {
  const meta = await getTranslations({
    locale,
    namespace: "metadata.dashboard.profile",
  });
  return {
    title: meta("title"),
    description: meta("description"),
  };
}

const page = () => {
  return <ListUnits />;
};

export default page;
