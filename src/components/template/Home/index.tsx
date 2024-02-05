import ContainerDashboard from "@/components/molecules/ContainerDashboard";
import { usePathTranslations } from "@/hooks/use-path-translations";

const Home = () => {
  const { any } = usePathTranslations("metadata.dashboard.home");
  return (
    <ContainerDashboard>
      <div className="p-6 flex flex-col justify-start items-start gap-4"></div>
    </ContainerDashboard>
  );
};

export default Home;
