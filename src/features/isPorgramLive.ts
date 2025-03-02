interface Program {
  schedules: {
    timestamp: number
    duration: number
  }
}

export default function isProgramLive(currentProgram: Program, nextProgram?: Program): boolean {
  const now = new Date()
  const startDate = new Date(currentProgram.schedules.timestamp * 1000)
  const endDate = new Date(startDate.getTime() + currentProgram.schedules.duration * 1000)

  const nextStartDate = nextProgram ? new Date(nextProgram.schedules.timestamp * 1000) : null

  const effectiveEndDate = nextStartDate ? new Date(Math.min(endDate.getTime(), nextStartDate.getTime())) : endDate

  return now >= startDate && now < effectiveEndDate
}
