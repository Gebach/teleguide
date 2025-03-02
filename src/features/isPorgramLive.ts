interface isProgramLive {
  programTime: string
  nextProgramTime: string
}

export default function isProgramLive(programTime: string, nextProgramTime: string) {
  const now = new Date()
  const [currentHours, currentMinutes] = [now.getHours(), now.getMinutes()]

  const [progHours, progMins] = programTime.split(':').map(Number)
  const progStart = progHours * 60 + progMins

  const nextStart = nextProgramTime ? nextProgramTime.split(':').reduce((h, m) => +h * 60 + +m, 0) : 23 * 60 + 59

  const currentTotal = currentHours * 60 + currentMinutes

  console.log(currentTotal, nextStart, nextProgramTime)

  return currentTotal >= progStart && currentTotal < nextStart
}
