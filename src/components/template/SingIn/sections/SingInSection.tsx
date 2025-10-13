import FormLogin from '@/components/organisms/FormLogin'
import ContainerSection from '@/components/molecules/ContainerSection'
import { Avatar } from '@/components/molecules'
import logoBarbearia from '../../../../../public/logo_barbearia.png'

const SingInSection = () => {
  return (
    <ContainerSection className="bg-primary-100">
      <div className="w-full bg-primary-100 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 py-8 mx-auto h-svh lg:py-0 md:gap-x-16">
        <div className="w-full md:w-5/12 flex flex-col md:flex-row justify-center md:justify-end items-center pr-0">
          <Avatar
            classIcon={`size-[${230}px] bg-black`}
            size={230}
            image={logoBarbearia}
          />
        </div>
        <div className="w-full md:w-7/12 flex flex-col justify-center items-start pl-0 h-auto md:h-[60vh]">
          <FormLogin />
        </div>
      </div>
    </ContainerSection>
  )
}

export default SingInSection
