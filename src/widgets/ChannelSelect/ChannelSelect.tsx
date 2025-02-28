import { observer } from 'mobx-react-lite'
import SelectList from '../../shared/ui/SelectList/SelectList'
import channelsStore from '../../shared/store/ChannelsStore'
import getAvailableChannels from '../../features/getAvailableChannels'
import { toJS } from 'mobx'

export const ChannelSelect = observer(() => {
  const { channels, setSelectedChannelSlug, isBroadcastLoading } = channelsStore

  const items = getAvailableChannels(toJS(channels))

  function onChange(c: string) {
    if (isBroadcastLoading) return // Блокировка смены канала во время загрузки
    setSelectedChannelSlug(c)
  }

  return <SelectList items={items} classname="w-full h-fit" placeholder="Выберите канал" onChange={onChange} />
})
