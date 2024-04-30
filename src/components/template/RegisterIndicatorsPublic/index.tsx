import { Button } from '@/components/atoms'
import { Avatar } from '@/components/molecules'
import Footer from '@/components/organisms/Footer'
import { FormRegisterIndicatorPublic } from '@/components/organisms/FormRegisterIndicatorPublic'
import { benefits } from '@/config/siteConfig'
import { CatalogIcons } from '@/utils/handleIcons'
import Image from 'next/image'

export async function RegisterIndicatorsPublic() {
  return (
    <div>
      <section className="flex flex-col lg:flex-row justify-start items-start">
        <div className="bg-primary-100 hidden lg:flex w-full lg:w-[50%] h-screen justify-center items-center">
          <Image
            src="/logo_madre_w.webp"
            width={420}
            height={420}
            quality={100}
            alt=""
          />
        </div>

        <div className="bg-stone-300 w-full lg:w-[50%] min-h-screen lg:h-screen flex flex-col justify-center items-center">
          <div className="p-4 w-full py-10 flex flex-col justify-center items-center gap-4 lg:gap-6">
            <div className="px-2 lg:px-16 flex justify-start items-start flex-col gap-6">
              <h3 className="text-md lg:text-2xl font-semibold text-center text-stone-500">
                BEM VINDO
              </h3>

              <h1 className="text-left text-2xl lg:text-4xl  text-primary-100">
                AO SISTEMA DE INDICADORES DA MADRE{' '}
                <b className="text-primary-50">SIM</b>
              </h1>

              <h2 className="text-left text-md lg:text-xl text-stone-500">
                Cadastre-se, indique futuros alunos e receba por cada matrícula
                efetivada. Comece a Indicar!
              </h2>
              <div className="w-full flex flex-row justify-start items-center">
                <Button
                  type="submit"
                  className="bg-primary-100 rounded-full w-fit"
                >
                  <span className="text-white font-semibold">
                    FAZER MEU CADASTRO
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white w-full flex flex-col justify-between items-center">
        <div className="w-4/5 flex flex-col justify-between items-center py-20 gap-12">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold text-center">
              Cadastre-se no SIM
            </h1>
            <h1 className="text-4xl font-bold text-center">
              e comece a indicar hoje mesmo
            </h1>

            <h3 className="text-xl font-semibold text-primary-50 text-center">
              É TUDO SIMPLES E MUITO FÁCIL
            </h3>
          </div>

          <p className="text-zinc-500 text-center px-8 md:px-24 lg:px-36">
            Receba por cada indicado que realizar sua inscrição e efetuar o
            pagamento da matrícula, o SIM é um sistema de indicação simples,
            rápido e gratuito, Com ele você controla seus indicados, visualiza
            valores previstos e valores a receber. Pronto para começar a
            indicar?
          </p>

          <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-0">
            <div className="flex flex-col justify-center items-center pr-0 lg:pr-16">
              <span className="text-6xl font-bold">250+</span>
              <p>Indicadores Cadastrados</p>
            </div>
            <div className="lg:flex hidden h-26 w-px bg-zinc-200" />
            <div className="flex flex-col justify-center items-center pr-0 lg:pl-16">
              <span className="text-6xl font-bold">3000+</span>
              <p>Indicações Cadastradas</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center p-6 bg-white">
        <div className="bg-zinc-400 w-full md:w-[400px] rounded-xl lg:w-[500px] py-6 flex justify-center items-center">
          <FormRegisterIndicatorPublic />
        </div>
      </section>
      <section className="bg-white py-16 pb-24">
        <div className="flex flex-col px-12 lg:px-0 items-center justify-center w-full gap-2">
          <h2 className="font-bold text-4xl text-blue-950	text-center">
            Como funciona o Sistema de Indicadores da Madre?.
          </h2>
          <h3 className=" text-md font-mono text-zinc-500 text-center">
            São 3 passos simples para você começar a faturar alto com
            indicações. É tudo muito fácil, veja:
          </h3>
        </div>
        <div className="w-full relative flex flex-col justify-center items-center pt-16 lg:pt-0">
          <div className="w-2/3 border-b-4 hidden	lg:block border-slate-200 h-16 translate-y-16"></div>

          <div className="w-10/12 lg:w-11/12 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-cols-max gap-20">
            {benefits.map((formacao) => {
              const icon: keyof CatalogIcons = formacao.icon ?? 'User'
              return (
                <div
                  key={formacao.id}
                  className="flex flex-col justify-start items-center px-10 sm:px-16 md:px-0"
                >
                  <div className="rounded-full w-36 h-36 flex items-center justify-center p-4 bg-white z-10">
                    <Avatar
                      href={formacao.link}
                      icon={icon}
                      size={55}
                      colorIcon="#001856"
                      classIcon=" hover:fill-white w-28 h-28 border-4 border-[#001856]"
                    />
                  </div>
                  <h1 className="font-bold text-center text-3xl">
                    {formacao.title}
                  </h1>
                  <h4 className="text-lg text-center pt-2 text-zinc-500">
                    {formacao.subtitle}
                  </h4>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
