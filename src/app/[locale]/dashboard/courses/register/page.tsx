import Home from "@/components/template/Home";
import ListCourses from "@/components/template/ListCourses";
import ListUnits from "@/components/template/ListUnits";
import ListUsers from "@/components/template/ListUsers";
import Profile from "@/components/template/Profile";
import RegisterCourses from "@/components/template/RegisterCourses";
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
  return <RegisterCourses />;
};

export default page;
