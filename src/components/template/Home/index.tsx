import { usePathTranslations } from "@/hooks/use-path-translations";

const Home = () => {
  const { te } = usePathTranslations("home.home_section");
  return (
    <div className="w-full h-10">
      <h5 className="">{te("title")}</h5>
      <h5 className="">{te("subtitle")}</h5>
    </div>
  );
};

export default Home;
