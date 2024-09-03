'use client'

import HighchartsReact from 'highcharts-react-official'
import * as Highcharts from 'highcharts'
import { useRef } from 'react'

const Chart = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  const optionsDefault: Highcharts.Options = {
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    credits: {
      enabled: true,
    },

    lang: {
      shortMonths: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      decimalPoint: ',',
      thousandsSep: '.',
    },
  }
  return (
    <HighchartsReact
      ref={chartComponentRef}
      highcharts={Highcharts}
      {...props}
      options={
        props.options ? { ...optionsDefault, ...props.options } : optionsDefault
      }
    />
  )
}

export default Chart
