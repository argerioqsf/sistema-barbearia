import FormLogin from "@/components/organisms/FormLogin";
import ContainerSection from "@/components/molecules/ContainerSection";

const SingInSection = () => {
  return (
    <ContainerSection>
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-4">
          <FormLogin />
        </div>
      </div>
    </ContainerSection>
  );
};

export default SingInSection;
