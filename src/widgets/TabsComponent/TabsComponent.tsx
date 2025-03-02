import { Tabs } from 'antd'
import { toJS } from 'mobx'
import { TabsComponentProps } from '../../shared/types/types'
import getUniqueDates from '../../features/getUniqueDates'
import { observer } from 'mobx-react-lite'
import isSameDates from '../../features/isSameDates'
import getFullDate from '../../features/getFullDate'
import { useEffect, useState } from 'react'
import channelsStore from '../../shared/store/ChannelsStore'

const TabsComponent = observer(({ items, classname, onChangeAction }: TabsComponentProps) => {
  const { getSelectedChannelSlug } = channelsStore
  const [activeKey, setActiveKey] = useState(getFullDate(new Date()))

  const tabsDates = getUniqueDates(toJS(items).map(item => item.schedules.timestamp))
  const tabItems = tabsDates.map(date => {
    return {
      label: isSameDates(new Date(date), new Date())
        ? 'Сегодня'
        : isSameDates(new Date(date), new Date(new Date().setDate(new Date().getDate() + 1)))
        ? 'Завтра'
        : isSameDates(new Date(date), new Date(new Date().setDate(new Date().getDate() - 1)))
        ? 'Вчера'
        : new Intl.DateTimeFormat('ru-RU', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
          }).format(new Date(date)),
      key: date,
    }
  })

  useEffect(() => {
    setActiveKey(getFullDate(new Date()))
    onChangeAction(new Date())
  }, [getSelectedChannelSlug()])

  function onChange(key: string) {
    setActiveKey(key)
    onChangeAction(new Date(key))
  }

  return (
    <Tabs
      type="card"
      activeKey={activeKey}
      onChange={onChange}
      tabPosition="top"
      className={classname}
      items={tabItems}
    />
  )
})

export default TabsComponent
