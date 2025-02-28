import { Select } from 'antd'
import { SelectListProps } from '../../types/types'

function SelectList({
  items,
  onChange,
  onSearch,
  classname,
  notFoundText = 'Пусто..',
  placeholder = 'Выберите из списка',
}: SelectListProps) {
  return (
    <Select
      className={classname}
      showSearch
      placeholder={placeholder}
      optionFilterProp="label"
      defaultActiveFirstOption={true}
      onChange={onChange}
      onSearch={onSearch}
      options={items}
      size="large"
      notFoundContent={<p>{notFoundText}</p>}
    />
  )
}

export default SelectList
