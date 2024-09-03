interface ChartTitleProps {
  title: string
  description: string
}

const ChartTitle = ({ title, description }: ChartTitleProps) => {
  return (
    <section className="flex flex-col justify-start border-gray-500 border p-4">
      <h5 className="flex items-center font-bold text-xl mt-1">{title}</h5>
      <span className="flex items-center font-medium text-sm">
        {description}
      </span>
    </section>
  )
}

export default ChartTitle
