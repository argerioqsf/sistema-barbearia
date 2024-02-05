import ContainerDashboard from "@/components/molecules/ContainerDashboard";
import { usePathTranslations } from "@/hooks/use-path-translations";

const Profile = () => {
  const { any } = usePathTranslations("metadata.dashboard.home");
  return (
    <ContainerDashboard>
      <div className="p-6 w-full flex flex-col justify-start items-start gap-4 bg-gray-500">
        Profile
      </div>
    </ContainerDashboard>
  );
};

export default Profile;
