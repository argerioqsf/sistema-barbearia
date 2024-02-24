import Home from "@/components/template/Home";
import ListSegments from "@/components/template/ListSegments";
import ListUsers from "@/components/template/ListUsers";
import Profile from "@/components/template/Profile";
import RegisterSegments from "@/components/template/RegisterSegments";
import RegisterUnits from "@/components/template/RegisterUnits";
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
  return <RegisterUnits />;
};

export default page;
