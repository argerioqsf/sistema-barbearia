import { getGraphics } from '@/actions/graphics'
import Chart from '@/components/atoms/Chart'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { CardMonitoring } from '@/components/molecules/CardMonitoring'
import ChartTitle from '@/components/molecules/ChartTitle'
import ContainerDashboard from '@/components/molecules/ContainerDashboard'
import { Graphics } from '@/types/general'
import { PaneBackgroundOptions } from 'highcharts'

export default async function Home() {
  const responseGraphics = await getGraphics()
  const graphics: Graphics | null = responseGraphics?.response ?? null
  const errorGraphics = responseGraphics.error?.request ?? null

  function gerarCorHexAleatoria(): string {
    const getRandomByte = () => Math.floor(Math.random() * 256)
    const r = getRandomByte()
    const g = getRandomByte()
    const b = getRandomByte()
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

    return hex
  }

  const item: PaneBackgroundOptions[] = [
    {
      innerRadius: 0,
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  ]

  const optionsServiceTime: Highcharts.Options = {
    chart: {
      type: 'gauge',
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%',
    },

    title: {
      text: '',
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: item,
      center: ['50%', '75%'],
      size: '110%',
    },
    yAxis: {
      min: 0,
      max: 90,
      tickPixelInterval: 30,
      tickPosition: 'inside',
      tickColor: '#FFFFFF',
      tickLength: 10,
      tickWidth: 2,
      minorTickInterval: 0,
      labels: {
        distance: 20,
        style: {
          fontSize: '14px',
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 30,
          color: '#55BF3B', // green
          thickness: 20,
          borderRadius: '30%',
        },
        {
          from: 32,
          to: 62,
          color: '#DDDF0D', // yellow
          thickness: 20,
          borderRadius: '30%',
        },
        {
          from: 64,
          to: 90,
          color: '#DF5353', // red
          thickness: 20,
          borderRadius: '30%',
        },
      ],
    },

    series: [
      {
        type: 'gauge',
        name: '',
        data: [Math.floor(graphics?.average_service_time?.media_em_dias ?? 0)],
        tooltip: {
          valueSuffix: ' dias',
        },
        dataLabels: {
          format: `${graphics?.average_service_time?.dias ?? 0} dias - ( ${graphics?.average_service_time?.horas ?? 0}h ${graphics?.average_service_time?.minutos ?? 0}m ${graphics?.average_service_time?.segundos ?? 0}s )`,
          borderWidth: 0,
          color: '#333333',
          style: {
            fontSize: '16px',
          },
        },
        dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%',
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6,
        },
      },
    ],
  }

  const optionsLeadsStep: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      plotShadow: false,
      type: 'pie',
    },
    tooltip: {
      pointFormat: '<b>{point.y} leads</b>',
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            x: 16,
            y: 25,
            format: '{point.name}',
          },
          {
            enabled: true,
            x: -10,
            y: 10,
            format: '{point.y}',
            style: {
              fontSize: '0.9em',
            },
          },
        ],
        showInLegend: true,
      },
      pie: {
        showInLegend: false,
        cursor: 'pointer',
        allowPointSelect: true,
        borderRadius: 8,
      },
    },
    series: [
      {
        name: 'leads',
        type: 'pie',
        innerSize: '50%',
        data: [
          {
            y: graphics?.leads_by_steps?.countStepNewLeads,
            name: 'Novos Leads',
          },
          {
            y: graphics?.leads_by_steps?.countStepPreService,
            name: 'Pré atendimento',
          },
          {
            y: graphics?.leads_by_steps?.countStepPresentationOportunity,
            name: 'Apresentação de oportunidade',
          },
          {
            y: graphics?.leads_by_steps?.countStepNegotiation,
            name: 'Negociação',
          },
          {
            y: graphics?.leads_by_steps?.countStepClosing,
            name: 'Fechamento',
          },
        ],
      },
    ],
  }

  const optionsLeadsRankingConsultant: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'bar',
    },
    series: [
      {
        type: 'bar',
        name: 'Leads',
        data: graphics?.rankingConsultantsCloseSales?.map((item) => {
          return {
            y: item.quant,
            color: gerarCorHexAleatoria(),
          }
        }),
      },
    ],
    tooltip: {
      pointFormat: '<b>{point.y} leads</b>',
    },
    xAxis: {
      categories: graphics?.rankingConsultantsCloseSales?.map(
        (item) => item.name ?? '',
      ),
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quant. leads convertidos',
      },
    },
    legend: {
      enabled: false,
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            format: '{point.name}',
          },
          {
            enabled: true,
            format: '{point.y}',
            style: {
              fontSize: '0.9em',
            },
          },
        ],
      },
      column: {
        showInLegend: false,
        cursor: 'pointer',
        allowPointSelect: true,
        borderRadius: 8,
      },
    },
  }

  const optionsLeadsRankingIndicators: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'bar',
    },
    series: [
      {
        type: 'bar',
        name: 'Leads',
        data: graphics?.leadsRankingIndicator?.map((item) => {
          return {
            y: item.quant,
            color: gerarCorHexAleatoria(),
          }
        }),
      },
    ],
    tooltip: {
      pointFormat: '<b>{point.y} leads</b>',
    },
    xAxis: {
      categories: graphics?.leadsRankingIndicator?.map(
        (item) => item.name ?? '',
      ),
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quant. leads indicados',
      },
    },
    legend: {
      enabled: false,
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            format: '{point.name}',
          },
          {
            enabled: true,
            format: '{point.y}',
            style: {
              fontSize: '0.9em',
            },
          },
        ],
      },
      column: {
        showInLegend: false,
        cursor: 'pointer',
        allowPointSelect: true,
        borderRadius: 8,
      },
    },
  }

  const optionsRankingCourses: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'bar',
    },
    series: [
      {
        type: 'bar',
        name: 'Leads',
        data: graphics?.coursesRanking?.map((item) => {
          return {
            y: item.quant,
            color: gerarCorHexAleatoria(),
          }
        }),
      },
    ],
    tooltip: {
      pointFormat: '<b>{point.y} leads</b>',
    },
    xAxis: {
      categories: graphics?.coursesRanking?.map((item) => item.name ?? ''),
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quant. leads convertidos',
      },
    },
    legend: {
      enabled: false,
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            format: '{point.name}',
          },
          {
            enabled: true,
            format: '{point.y}',
            style: {
              fontSize: '0.9em',
            },
          },
        ],
      },
      column: {
        showInLegend: false,
        cursor: 'pointer',
        allowPointSelect: true,
        borderRadius: 8,
      },
    },
  }

  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        {errorGraphics ? (
          <div>
            <h1>Erro ao buscar gráficos</h1>
          </div>
        ) : (
          <div className="w-full">
            {graphics && (
              <div className="w-full p-5 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14 lg:gap-20 items-center justify-center">
                {graphics.leads_per_day !== undefined && (
                  <CardMonitoring
                    last={false}
                    card={{
                      subinfo: {
                        value: `${graphics.leads_per_day.diff > 0 ? '+' + graphics.leads_per_day.diff : graphics.leads_per_day.diff}`,
                        label: 'Diferença para ontem',
                      },
                      icon:
                        graphics.leads_per_day.diff > 0
                          ? 'ChevronUp'
                          : 'ChevronDown',
                      label: 'Leads por dia',
                      value: graphics.leads_per_day.value,
                    }}
                    classSubinfoValue="text-2xl font-bold"
                    classSubinfoLabel="text-base font-bold"
                    classSubinfo={
                      graphics.leads_per_day.diff === 0
                        ? 'bg-primary-100'
                        : graphics.leads_per_day.diff > 0
                          ? 'bg-lime-800'
                          : 'bg-red-800'
                    }
                  />
                )}
                {graphics.leads_per_cycle !== undefined && (
                  <CardMonitoring
                    last={false}
                    card={{
                      subinfo: {
                        value: `${graphics.leads_per_cycle.diff > 0 ? '+' + graphics.leads_per_cycle.diff : graphics.leads_per_cycle.diff}`,
                        label: 'Diferença para o ultimo ciclo',
                      },
                      icon:
                        graphics.leads_per_cycle.diff > 0
                          ? 'ChevronUp'
                          : 'ChevronDown',
                      label: 'Leads por ciclo',
                      value: graphics.leads_per_cycle.value,
                    }}
                    classSubinfoValue="text-2xl font-bold"
                    classSubinfoLabel="text-base font-bold"
                    classSubinfo={
                      graphics.leads_per_cycle.diff === 0
                        ? 'bg-primary-100'
                        : graphics.leads_per_cycle.diff > 0
                          ? 'bg-lime-800'
                          : 'bg-red-800'
                    }
                  />
                )}
                {graphics.bonus?.bonus_awaiting_confirmation !== undefined && (
                  <CardMonitoring
                    last={true}
                    card={{
                      icon: 'CircleDollarSign',
                      label: 'Bonus aguardando confirmação',
                      value: `R$${graphics.bonus?.bonus_awaiting_confirmation.total}`,
                    }}
                    classSubinfoValue="text-2xl font-bold"
                    classSubinfoLabel="text-base font-bold"
                  />
                )}
                {graphics.bonus?.bonus_awaiting_confirmation !== undefined && (
                  <CardMonitoring
                    last={true}
                    card={{
                      icon: 'CircleDollarSign',
                      label: 'Bonus confirmados',
                      value: `R$${graphics.bonus?.bonus_confirmed.total}`,
                    }}
                    key={1}
                    classSubinfoValue="text-2xl font-bold"
                    classSubinfoLabel="text-base font-bold"
                  />
                )}
              </div>
            )}
            <div className="p-5 w-full grid grid-cols-12 gap-6">
              {graphics?.leads_by_steps && (
                <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                  <ChartTitle title="Leads por etapas" description="" />
                  <div className="p-4 min-h-[440px] border rounded-b-lg border-black border-t-0">
                    <Chart options={optionsLeadsStep} />
                  </div>
                </div>
              )}
              {graphics?.average_service_time && (
                <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                  <ChartTitle
                    title="Média de tempo de atendimento ( em dias )"
                    description=""
                  />
                  <div className="p-4 min-h-[440px] border rounded-b-lg border-black border-t-0">
                    <Chart options={optionsServiceTime} />
                  </div>
                </div>
              )}
              {graphics?.rankingConsultantsCloseSales && (
                <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                  <ChartTitle
                    title="Consultores que mais convertem"
                    description=""
                  />
                  <div className="p-4 min-h-[440px] border rounded-b-lg border-black border-t-0">
                    <Chart options={optionsLeadsRankingConsultant} />
                  </div>
                </div>
              )}
              {graphics?.leadsRankingIndicator && (
                <div className="w-full col-span-12 md:col-span-6 lg:col-span-6">
                  <ChartTitle title="Top 10 indicadores" description="" />
                  <div className="p-4 min-h-[440px] border rounded-b-lg border-black border-t-0">
                    <Chart options={optionsLeadsRankingIndicators} />
                  </div>
                </div>
              )}
              {graphics?.coursesRanking && (
                <div className="w-full col-span-12 md:col-span-12 lg:col-span-6">
                  <ChartTitle
                    title="Cursos que mais convertem"
                    description=""
                  />
                  <div className="p-4 min-h-[440px] border rounded-b-lg border-black border-t-0">
                    <Chart options={optionsRankingCourses} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ContainerDashboard>
  )
}
