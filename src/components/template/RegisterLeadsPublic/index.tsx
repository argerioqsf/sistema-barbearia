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
    <div>
      <section className="flex flex-col lg:flex-row justify-start items-center min-h-screen bg-primary-100">
        <div className=" hidden lg:flex w-full lg:w-[50%] h-full justify-center items-center">
          <Image
            src="/logo_madre_w.webp"
            width={420}
            height={420}
            quality={100}
            alt=""
          />
        </div>

        <div className="bg-stone-300 w-full lg:w-[50%] min-h-screen flex flex-col justify-center items-center">
          <div className="p-4 w-full py-10 flex flex-col justify-center items-center gap-4 lg:gap-6">
            <FormRegisterLeadPublic
              userId={indicator.profile.id}
              name={indicator.name}
            />
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
