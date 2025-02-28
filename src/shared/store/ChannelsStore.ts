import { makeAutoObservable, runInAction } from 'mobx'
import { IBroadcast, IChannel } from '../types/types'
import { parseBroadcast } from '../../features/parseBroadcast'

class ChannelsStore {
  channels: IChannel[] = []
  channel: string | null = null
  isLoading: boolean = false
  isChannelsLoading: boolean = false
  isBroadcastLoading: boolean = false
  broadcast: IBroadcast[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getChannels = async () => {
    if (this.isChannelsLoading || this.channels.length > 0) return

    try {
      this.isChannelsLoading = true
      const data = await fetch('/data/channels.json').then(res => res.json())

      runInAction(() => {
        this.channels = data.data
        if (data.data.length > 0) {
          this.channel = data.data[0].slug
        }
      })
    } catch (error) {
      console.error('Error loading channels:', error)
    } finally {
      runInAction(() => {
        this.isChannelsLoading = false
      })
    }
  }

  getSelectedChannelSlug = () => {
    return this.channel
  }

  setSelectedChannelSlug = (channel: string) => {
    this.channel = channel
  }

  getChannelBroadcast = async () => {
    if (!this.channel || this.isBroadcastLoading) return

    try {
      this.isBroadcastLoading = true
      const data = await fetch(`/data/programs/${this.channel}.json`).then(res => res.json())

      runInAction(() => {
        this.broadcast = parseBroadcast(data.data).sort((a, b) => {
          const dateA = new Date(a.schedules.timestamp * 1000)
          const dateB = new Date(b.schedules.timestamp * 1000)
          return dateA.getTime() - dateB.getTime()
        })
      })
    } catch (error) {
      console.error('Error loading broadcast:', error)
    } finally {
      runInAction(() => {
        this.isBroadcastLoading = false
      })
    }
  }
}

const channelsStore = new ChannelsStore()
export default channelsStore
