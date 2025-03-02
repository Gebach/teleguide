import { IBroadcast } from '../shared/types/types'

export const parseBroadcast = (broadcast: IBroadcast[]) => {
  return broadcast.map(item => {
    const date = new Date(item.schedules.timestamp * 1000)
    const time = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return {
      ...item,
      schedules: {
        ...item.schedules,
        start_at: time,
      },
    }
  })
}
