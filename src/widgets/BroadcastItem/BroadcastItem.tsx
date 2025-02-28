import channelsStore from '../../shared/store/ChannelsStore'
import { IBroadcast } from '../../shared/types/types'

interface BroadcastItemProps {
  item: IBroadcast
  isLive?: boolean
  selectedDate?: Date
}

function BroadcastItem({ item, isLive, selectedDate = new Date() }: BroadcastItemProps) {
  const { channels, getSelectedChannelSlug } = channelsStore

  // const currentDate = selectedDate
  const currentDate = new Date()
  const itemDate = new Date(item.schedules.timestamp * 1000)

  if (
    currentDate.getFullYear !== itemDate.getFullYear ||
    currentDate.getMonth() !== itemDate.getMonth() ||
    currentDate.getDay() !== itemDate.getDay()
  )
    return null

  return (
    <>
      <div
        className={`broadcast-list__item flex items-center gap-5 p-2 transition-colors cursor-pointer hover:bg-[#D6D6D6] rounded-2xl h-fit ${
          isLive && `bg-[#D6D6D6]`
        }`}
      >
        <div className="broadcast-list__item__preview max-w-[200px] w-full h-[90px] rounded-3xl bg-[#EBEBEB]">
          <div className=" w-full h-full" />
        </div>

        <div className="broadcast-list__item__info flex flex-col gap-2">
          <div className="info__header flex items-center gap-6">
            {item.schedules.start_at && (
              <p className="info__start-time text-xs text-gray-400">{item.schedules.start_at.toLocaleString()}</p>
            )}
            {isLive && <p className="bg-orange-500 text-white block rounded-2xl px-2 py-1">В эфире</p>}
          </div>
          <p className="info__title text-sm font-bold">{item.title}</p>
          <p className="info__age text-xs text-gray-400 font-extralight">
            {item.content.age ?? channels.find(channel => channel.slug === getSelectedChannelSlug())?.age_rating}+
          </p>
        </div>
      </div>
    </>
  )
}

export default BroadcastItem
