import DetailIndicator from "@/components/template/DetailIndicators";
import Home from "@/components/template/Home";
import ListIndicators from "@/components/template/ListIndicators";
import Profile from "@/components/template/Profile";
import RegisterIndicators from "@/components/template/RegisterIndicators";
import { ParamsProp } from "@/types/general";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale, id },
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

const page = ({ params: { id } }: { params: { id: string } }) => {
  return <DetailIndicator id={id} />;
};

export default page;
