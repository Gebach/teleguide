import React from 'react'

export interface ContainerProps {
  children: React.ReactNode
  classname?: string
}

export interface IChannel {
  id: number
  title: string
  description: string
  number: number
  categories: number[]
  icon_path: string
  archive_hours: number
  age_rating: number
  slug: string
  packets: number[]
  is_favorite: boolean
  is_purchased: boolean
  is_geo_available: boolean

  broadcast: IBroadcast[]
}

interface BroadcastContent {
  id: number
  title: string
  short: string
  age: number
  genres: number[]
  category: string
  rating: number
  rating_imdb: number
  rating_kinopoisk: number
}

interface ContentEpisode {
  id: number
  title: string
  description: string
  schedules: null
}

interface Schedules {
  id: number
  channel: number
  timestamp: number
  start_at: string
  duration: number
}

export interface IBroadcast {
  id: number
  title: string
  content: BroadcastContent
  content_episode: ContentEpisode
  schedules: Schedules
  packets: number[]
  is_purchased: boolean
  is_geo_available: boolean
}

export interface SelectListProps {
  items: {
    value: string
    label: string
  }[]
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  classname?: string
  notFoundText?: string
  placeholder?: string
}

export interface TabsComponentProps {
  items: IBroadcast[]
  classname?: string
  onChangeAction: (value: Date) => void
}
