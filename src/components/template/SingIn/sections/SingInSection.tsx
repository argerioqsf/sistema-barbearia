"use client";

import FormLogin from "@/components/organisms/FormLogin";
import ContainerSection from "@/components/molecules/ContainerSection";
import { Avatar } from "@/components/molecules";
import { Text } from "@/components/atoms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useHandlerRouter } from "@/hooks/use-handler-router";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

const SingInSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const { pushRouter } = useHandlerRouter();

  type LoginSchemaType = z.infer<typeof loginSchema>;

  function handleLogin(data: LoginSchemaType) {
    console.log("data SingInSection: ", data);
    pushRouter("dashboard/home");
  }

  return (
    <ContainerSection className="bg-primary-100">
      <div className="w-full bg-primary-100 flex flex-col md:flex-row items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-2/4 flex flex-col md:flex-row justify-center md:justify-end items-center pr-0 md:pr-[10vw]">
          <Avatar
            classIcon={`size-[${160}px] bg-black`}
            size={160}
            image="https://www.grupomadretereza.com.br/sim/themes/simadm/assets/images/logo.png"
          />
          <Text className="text-6xl font-bold text-white pl-0 pt-4 md:pt-0 md:pl-6">
            SIM
          </Text>
        </div>
        <div className="w-full md:w-2/4 flex flex-col justify-center items-start md:border-l-2 pl-0 md:pl-[10vw] h-auto md:h-[60vh]">
          <FormLogin
            register={register}
            errors={errors}
            onSubmit={handleSubmit(handleLogin)}
          />
        </div>
      </div>
    </ContainerSection>
  );
};

export default SingInSection;
