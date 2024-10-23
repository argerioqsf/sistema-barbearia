import { getIndicator } from '@/actions/user'
import { Avatar } from '@/components/molecules'
import Footer from '@/components/organisms/Footer'
import { FormRegisterLeadPublic } from '@/components/organisms/FormRegisterLeadPublic'
import { formations } from '@/config/siteConfig'
import { CatalogIcons } from '@/utils/handleIcons'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface RegisterLeadsPublicProps {
  id: string
}

export async function RegisterLeadsPublic({ id }: RegisterLeadsPublicProps) {
  const response = await getIndicator(id)
  const indicator = response.response
  if (!indicator) {
    notFound()
  }

  return (
    <div className="w-full">
      <section className="w-full">
        <div className="w-full relative bg-cover bg-center lg:bg-[url('https://cdn.brasildefato.com.br/media/05888e43d7d546ed88b58bfdc8ca13b3.jpg')]">
          <div className="w-full absolute min-h-full bg-primary-100 lg:bg-gradient-to-r from-primary-100 from-40% via-primary-100 via-75% to-secondary-100 to-100% lg:opacity-90" />
          <div className="w-full flex flex-col lg:flex-row justify-start items-end h-full">
            <div className="bg-[url('https://cdn.brasildefato.com.br/media/05888e43d7d546ed88b58bfdc8ca13b3.jpg')] lg:bg-none min-h-screen lg:min-h-full w-full z-20 fixed animate-opacityDown lg:relative flex lg:w-[50%] lg:animate-opacityUp flex-col justify-end items-center">
              <Image
                className="z-20"
                src="/logo_madre_w.webp"
                width={420}
                height={420}
                quality={100}
                alt=""
              />
              <h2 className="z-40 font-bold text-5xl text-stone-400 tracking-wider text-center mb-24">
                Seu futuro bem <br /> na sua frente!
              </h2>
              <div className="min-h-full z-30 w-[50vw] hidden lg:flex absolute top-0 bg-gradient-to-b from-transparent from-05% to-primary-100 to-90%" />
              <div className="z-30 lg:z-30 min-h-screen w-full lg:w-[50vw] flex absolute lg:hidden top-0 bg-gradient-to-b from-transparent from-55% to-green-500 to-100%" />
              <div className="z-10 w-full absolute flex lg:hidden min-h-screen bg-primary-100 opacity-90" />
            </div>

            <div className="z-10 w-full lg:w-[45%] min-h-screen flex flex-col justify-center items-center">
              <FormRegisterLeadPublic
                userId={indicator.profile.id}
                name={indicator.name}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="flex flex-col items-center justify-center w-full">
          <h3 className="font-bold text-xl font-mono text-zinc-500 text-center">
            NOSSAS
          </h3>
          <h2 className="font-bold text-4xl text-blue-950	text-center">
            FORMAÇÕES
          </h2>
        </div>
        <div className="w-full relative flex flex-col justify-center items-center pt-16 lg:pt-0">
          <div className="w-2/3 border-b-4 hidden	lg:block border-slate-200 h-16 translate-y-16"></div>

          <div className="w-10/12 lg:w-11/12 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-cols-max gap-20">
            {formations.map((formacao) => {
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
