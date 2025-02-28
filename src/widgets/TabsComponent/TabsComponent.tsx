import { Tabs } from 'antd'
import { TabsComponentProps } from '../../shared/types/types'
import { toJS } from 'mobx'
import getUniqueDates from '../../features/getUniqueDates'
import { observer } from 'mobx-react-lite'

const TabsComponent = observer(({ items, classname, onChangeAction }: TabsComponentProps) => {
  const tabsDates = getUniqueDates(toJS(items).map(item => item.schedules.timestamp))
  const tabItems = tabsDates.map(date => ({
    label: date.substring(0, 5),
    key: date,
  }))

  function onChange(key: string) {
    onChangeAction(new Date(Number(key.split('.')[2]), Number(key.split('.')[1]), Number(key.split('.')[0])))
    console.log(Number(key.split('.')[2]), Number(key.split('.')[1]), Number(key.split('.')[0]))
    console.log(`${key.split('.')[2]}-${key.split('.')[1]}-${key.split('.')[0]}`)
  }

  return <Tabs onChange={onChange} tabPosition="top" className={classname} items={tabItems} />
})

export default TabsComponent
