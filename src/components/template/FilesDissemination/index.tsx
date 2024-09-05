import { deleteFile, getFiles } from '@/actions/file'
import { getProfile } from '@/actions/profile'
import { IconAction } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { ButtonDownloadImage } from '@/components/molecules/ButtonDownloadImage'
import { ButtonRegisterFile } from '@/components/molecules/ButtonRegisterFile'
import ContainerDashboard from '@/components/molecules/ContainerDashboard'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function FilesDissemination() {
  const responseProfile = await getProfile()
  const profile = responseProfile?.response
  const errorRequestP = responseProfile.error?.request

  if (!profile) {
    notFound()
  }

  const response = await getFiles()
  const files = response?.response ?? null
  const errorRequest = response.error?.request ?? null
  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <ButtonRegisterFile profile={profile} />
        <div className="w-full">
          {errorRequest || errorRequestP ? (
            <div>Erro ao carregar arquivos</div>
          ) : (
            files &&
            files?.length > 0 && (
              <div className="w-full flex flex-col justify-start items-center gap-4">
                {files.map((file, idx) => (
                  <div
                    className="p-2 flex flex-col rounded-md bg-primary-100 justify-start items-center"
                    key={idx}
                  >
                    <Image
                      className="rounded-md rounded-b-none"
                      src={`${process.env.API_BASE_URL}${file.url}`}
                      width={400}
                      height={80}
                      alt=""
                    />
                    <div className="w-full rounded-md rounded-t-none p-2 flex flex-row justify-between items-center bg-primary-100">
                      <ButtonDownloadImage
                        name={file.filename}
                        href={`${process.env.API_BASE_URL}${file.url}`}
                      />
                      {checkUserPermissions('file.delete', profile.role) && (
                        <IconAction
                          colorIcon="red"
                          icon="Trash"
                          size={20}
                          toastInfo={{
                            title: 'Imagem deletada com sucesso',
                          }}
                          alertInfo={{
                            title: 'Deseja realmente apagar esta imagem?',
                          }}
                          classIcon="bg-white"
                          onClick={deleteFile.bind(null, file.filename)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </ContainerDashboard>
  )
}
