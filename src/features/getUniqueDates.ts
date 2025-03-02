export default function filterUniqueDays(timestamps: number[]): string[] {
  const uniqueDays = new Map<string, boolean>()

  timestamps.forEach(timestamp => {
    const date = new Date(timestamp * 1000)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    const dateKey = `${year}-${month}-${day}`

    if (!uniqueDays.has(dateKey)) {
      uniqueDays.set(dateKey, true)
    }
  })

  return Array.from(uniqueDays.keys()).sort((a, b) => {
    const [aYear, aDay, aMonth] = a.split('.')
    const [bYear, bDay, bMonth] = b.split('.')
    return new Date(`${aYear}-${aMonth}-${aDay}`).getTime() - new Date(`${bYear}-${bMonth}-${bDay}`).getTime()
  })
}
