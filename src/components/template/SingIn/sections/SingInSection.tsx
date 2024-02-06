import FormLogin from "@/components/organisms/FormLogin";
import ContainerSection from "@/components/molecules/ContainerSection";
import { Avatar } from "@/components/molecules";
import { Text } from "@/components/atoms";

const SingInSection = () => {
  return (
    <ContainerSection className="bg-primary-100">
      <div className="w-full bg-primary-100 flex flex-row items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-2/4 flex flex-row justify-end items-center pr-32">
          {/* logo SIM */}
          <Avatar
            size={160}
            bgColor="black"
            image="https://www.grupomadretereza.com.br/sim/themes/simadm/assets/images/logo.png"
          />
          <Text className="text-6xl font-bold text-white pl-6">SIM</Text>
        </div>
        <div className="w-2/4 flex flex-col justify-center items-start border-l-2  pl-32 h-[60vh]">
          <FormLogin />
        </div>
      </div>
    </ContainerSection>
  );
};

export default SingInSection;
