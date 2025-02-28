import { useEffect } from 'react'
import { IBroadcast } from '../../shared/types/types'
import BroadcastItem from '../BroadcastItem/BroadcastItem'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import channelsStore from '../../shared/store/ChannelsStore'
import { observer } from 'mobx-react-lite'
import isProgramLive from '../../features/isPorgramLive'

interface BroadcastListProps {
  items: IBroadcast[]
  selectedDate: Date
}

const BroadcastList = observer(({ items, selectedDate = new Date() }: BroadcastListProps) => {
  const { isBroadcastLoading, channel, getChannelBroadcast } = channelsStore

  useEffect(() => {
    getChannelBroadcast()
  }, [channel])

  return isBroadcastLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48, left: '50%' }} spin />} />
  ) : (
    <div className="broadcast-list flex flex-col gap-2">
      {items.map((item, index) => {
        const isLive = isProgramLive(item.schedules.start_at, items[index + 1]?.schedules.start_at)
        return (
          <BroadcastItem
            selectedDate={selectedDate}
            key={`${item.id}-${item.schedules.timestamp}`}
            item={item}
            isLive={isLive}
          />
        )
      })}
    </div>
  )
})

export default BroadcastList
