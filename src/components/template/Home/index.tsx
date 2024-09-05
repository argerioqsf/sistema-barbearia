import { getCharts } from '@/actions/chart'
import Chart from '@/components/atoms/Chart'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import ChartTitle from '@/components/molecules/ChartTitle'
import ContainerDashboard from '@/components/molecules/ContainerDashboard'

export default async function Home() {
  const response = await getCharts()
  const charts = response?.response ?? null
  const errorRequest = response.error?.request ?? null

  const data1 = [charts ? charts.length : 20]
  const data2 = [charts ? charts.length : 60]

  const options1: Highcharts.Options = {
    title: {
      text: '',
    },

    chart: {
      type: 'column',
    },

    series: [
      {
        name: 'Ignite',
        type: 'column',
        data: data1,
        color: '#8257E5',
      },
      {
        name: 'Experts Club',
        type: 'column',
        data: data2,
        color: '#DD2919',
      },
    ],

    tooltip: {
      enabled: false,
    },

    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          useHTML: true,
          enabled: true,
          color: 'black',
          inside: true,
          verticalAlign: 'bottom',
          borderWidth: 3,
          shadow: false,
          style: {
            fontSize: '36px',
            fontWeight: 'bold',
            fontStyle: 'Normal',
            lineHeight: '44px',
            fontFamily: 'Inter',
            textOutline: '0',
            padding: '14px',
          },
        },
      },
    },
  }

  const options2: Highcharts.Options = {
    title: {
      text: '',
    },

    chart: {
      type: 'pie',
    },

    series: [
      {
        type: 'pie',
        innerSize: '60%',
        data: [
          {
            x: charts ? charts[0].units?.length : 2,
            y: 75,
            color: '#DD2919',
            name: 'Experts Club',
          },
          {
            x: charts ? charts[0].organizations?.length : 2,
            y: 17,
            color: '#8257E5',
            name: 'Ignite',
          },
        ],
      },
    ],

    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        cursor: 'pointer',
        allowPointSelect: true,
      },
    },
  }

  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        {errorRequest ? (
          <div>
            <h1>Erro ao buscar gráficos</h1>
          </div>
        ) : (
          <div className="p-5 w-full grid grid-cols-12 gap-6">
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
              <ChartTitle
                title="teste de titulo"
                description="teste de descrição"
              />
              <div className="p-4 border border-black border-t-0">
                <Chart options={options1} />
              </div>
            </div>

            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
              <ChartTitle
                title="teste de titulo"
                description="teste de descrição"
              />
              <div className="p-4 border border-black border-t-0">
                <Chart options={options2} />
              </div>
            </div>

            <div className="w-full col-span-12 md:col-span-12 lg:col-span-4">
              <ChartTitle
                title="teste de titulo"
                description="teste de descrição"
              />
              <div className="p-4 border border-black border-t-0">
                <Chart options={options2} />
              </div>
            </div>

            <div className="w-full col-span-12">
              <ChartTitle
                title="teste de titulo"
                description="teste de descrição"
              />
              <div className="p-4 border border-black border-t-0">
                <Chart options={options2} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ContainerDashboard>
  )
}
