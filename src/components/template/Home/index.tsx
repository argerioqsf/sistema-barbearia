import Breadcrumb from '@/components/molecules/Breadcrumb'
import ContainerDashboard from '@/components/molecules/ContainerDashboard'
const Home = () => {
  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
      </div>
    </ContainerDashboard>
  )
}

export default Home
