import DetailSegments from "@/components/template/DetailSegments";
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
  return <DetailSegments id={id} />;
};

export default page;
