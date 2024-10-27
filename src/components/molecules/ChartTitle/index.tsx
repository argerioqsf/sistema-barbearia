interface ChartTitleProps {
  title: string
  description: string
}

const ChartTitle = ({ title, description }: ChartTitleProps) => {
  return (
    <div className="flex flex-col border-black justify-start border rounded-lg rounded-b-none border-b-0 p-4">
      <h5 className="flex items-center font-bold text-xl mt-1">{title}</h5>
      <span className="flex items-center font-medium text-sm">
        {description}
      </span>
    </div>
  )
}

export default ChartTitle
