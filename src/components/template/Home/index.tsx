import { usePathTranslations } from "@/hooks/use-path-translations";

const Home = () => {
  const { any } = usePathTranslations("metadata.dashboard.home");
  return (
    <div className="w-full h-10">
      <h5 className="">{any("title")}</h5>
      <h5 className="">{any("description")}</h5>
    </div>
  );
};

export default Home;
