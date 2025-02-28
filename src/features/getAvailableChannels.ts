import { IChannel } from '../shared/types/types'

export default function getAvailableChannels(channels: IChannel[]) {
  return channels
    ?.filter(channel => channel.is_purchased && channel.is_geo_available)
    .map(channel => ({
      value: channel.slug,
      label: channel.title,
    }))
}
