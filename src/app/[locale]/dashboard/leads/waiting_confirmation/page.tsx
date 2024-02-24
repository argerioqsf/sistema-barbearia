import ListLeads from "@/components/template/ListLeads";
import ListWaitingConfirmationLeads from "@/components/template/ListWaitingConfirmationLeads";
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
  return <ListWaitingConfirmationLeads />;
};

export default page;
