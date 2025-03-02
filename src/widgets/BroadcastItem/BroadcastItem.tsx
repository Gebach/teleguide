import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import channelsStore from '../../shared/store/ChannelsStore'
import { IBroadcast } from '../../shared/types/types'

interface BroadcastItemProps {
  item: IBroadcast
  isLive?: boolean
  requiredDate: Date
  classname?: string
}

export const BroadcastItem = observer(({ item, isLive, requiredDate = new Date(), classname }: BroadcastItemProps) => {
  const { channels, getSelectedChannelSlug } = channelsStore
  const [isNotAllowed, setIsNotAllowed] = useState<boolean>(true)
  const [currentDate, setCurrentDate] = useState<Date>(requiredDate)
  const rightItemData = new Date(item.schedules.timestamp * 1000)

  useEffect(() => {
    setIsNotAllowed(rightItemData > dateNow && !isLive)
    setCurrentDate(requiredDate)
  }, [requiredDate, getSelectedChannelSlug()])

  const dateNow = new Date()
  const itemDate = rightItemData

  if (
    currentDate.getFullYear !== itemDate.getFullYear ||
    currentDate.getMonth() !== itemDate.getMonth() ||
    currentDate.getDay() !== itemDate.getDay()
  )
    return null

  return (
    <div
      className={`broadcast-list__item flex items-center gap-5 p-2 transition-colors  hover:bg-[#D6D6D6] rounded-2xl h-fit ${classname} ${
        isLive && `bg-[#D6D6D6] isLive`
      } ${isNotAllowed ? `cursor-not-allowed opacity-60` : 'cursor-pointer'}`}
    >
      <div className="broadcast-list__item__preview max-w-[200px] w-full h-[90px] rounded-3xl bg-[#EBEBEB]">
        <div className=" w-full h-full" />
      </div>

      <div className="broadcast-list__item__info flex flex-col gap-2">
        <div className="info__header flex items-center gap-4">
          {item.schedules.start_at && (
            <p className="info__start-time text-xs text-gray-400">{item.schedules.start_at}</p>
          )}
          {isLive && <p className="bg-orange-500 text-white block rounded-2xl px-2 py-1 text-sm">В эфире</p>}
        </div>
        <p className="info__title text-sm font-bold">{item.title}</p>
        <p className="info__age text-xs text-gray-400 font-extralight">
          {item.content.age ?? channels.find(channel => channel.slug === getSelectedChannelSlug())?.age_rating}+
        </p>
      </div>
    </div>
  )
})

export default BroadcastItem
