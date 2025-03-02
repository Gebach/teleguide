import { useEffect } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import channelsStore from '../../shared/store/ChannelsStore'
import { IBroadcast } from '../../shared/types/types'
import BroadcastItem from '../BroadcastItem/BroadcastItem'
import isProgramLive from '../../features/isPorgramLive'
import scrollTo from '../../features/scrollTo'
import getFullDate from '../../features/getFullDate'

interface BroadcastListProps {
  items: IBroadcast[]
  selectedDate: Date
}

const BroadcastList = observer(({ items, selectedDate = new Date() }: BroadcastListProps) => {
  const { isBroadcastLoading, channel, getChannelBroadcast } = channelsStore
  let isLive = false

  useEffect(() => {
    getChannelBroadcast()
    setTimeout(() => {
      scrollTo('.isLive')
    }, 700)
  }, [channel, selectedDate])

  return isBroadcastLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48, left: '50%' }} spin />} />
  ) : (
    <div className="broadcast-list flex flex-col gap-2">
      {items.map((item, index) => {
        isLive = isProgramLive(item, items[index + 1])

        return (
          <BroadcastItem
            requiredDate={selectedDate}
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
