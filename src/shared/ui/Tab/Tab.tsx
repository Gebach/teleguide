function Tab({
  selected = false,
  onClick,
  text,
  classname,
  children,
}: {
  selected?: boolean
  onClick?: () => void
  text: string
  classname?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={`rounded-xl bg-gray-500 bg-opacity-30 p-2 text-black hover:bg-opacity-45 ${classname} ${
        selected ? 'bg-opacity-60' : ''
      }`}
      onClick={onClick}
    >
      {children}
      {text}
    </div>
  )
}

export default Tab
