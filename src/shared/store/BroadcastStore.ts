import { makeAutoObservable, runInAction } from 'mobx'
import { IBroadcast } from '../types/types'
// import BroadcastMatchTVJson from '../data/programs/match_tv_ufa.json'
// import BroadcastKaruselJson from '../data/programs/karusel_ufa.json'

class BroadcastStore {
  broadcast: IBroadcast[] = []
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  getBroadcast = async (channel: string) => {
    this.isLoading = true
    const res = await fetch(`/data/programs/${channel}.json`).then(res => res.json())
    runInAction(() => {
      this.broadcast = res.data
      this.isLoading = false
    })
  }
}

const broadcastStore = new BroadcastStore()
export default broadcastStore
