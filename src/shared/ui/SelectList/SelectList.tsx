import { Select } from 'antd'
import { SelectListProps } from '../../types/types'
import channelsStore from '../../store/ChannelsStore'

function SelectList({
  items,
  onChange,
  onSearch,
  classname,
  notFoundText = 'Пусто..',
  placeholder = 'Выберите из списка',
}: SelectListProps) {
  const { isChannelsLoading } = channelsStore
  let initialvalue: string = 'Матч ТВ'
  if (!isChannelsLoading) initialvalue = items[0]?.value
  return (
    <Select
      className={classname}
      showSearch
      placeholder={placeholder}
      optionFilterProp="label"
      defaultActiveFirstOption={true}
      defaultValue={initialvalue}
      onChange={onChange}
      onSearch={onSearch}
      options={items}
      size="large"
      notFoundContent={<p>{notFoundText}</p>}
    />
  )
}

export default SelectList
