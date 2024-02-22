import Home from "@/components/template/Home";
import ListSegments from "@/components/template/ListSegments";
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
  return <ListSegments />;
};

export default page;
