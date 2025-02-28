import { IChannel } from '../types/types'

export class Channel implements IChannel {
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

  constructor(
    id: number,
    title: string,
    description: string,
    number: number,
    categories: number[],
    icon_path: string,
    archive_hours: number,
    age_rating: number,
    slug: string,
    packets: number[],
    is_favorite: boolean,
    is_purchased: boolean,
    is_geo_available: boolean
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.number = number
    this.categories = categories
    this.icon_path = icon_path
    this.archive_hours = archive_hours
    this.age_rating = age_rating
    this.slug = slug
    this.packets = packets
    this.is_favorite = is_favorite
    this.is_purchased = is_purchased
    this.is_geo_available = is_geo_available
  }
}
