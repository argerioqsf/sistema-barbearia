import Breadcrumb from "@/components/molecules/Breadcrumb";
import ContainerDashboard from "@/components/molecules/ContainerDashboard";
import { usePathTranslations } from "@/hooks/use-path-translations";

const Home = () => {
  const { any } = usePathTranslations("metadata.dashboard.home");
  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-start items-center gap-4 bg-gray-500">
        <Breadcrumb />
        Home
      </div>
    </ContainerDashboard>
  );
};

export default Home;
