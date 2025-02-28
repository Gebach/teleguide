export default function scrollTo(id: string) {
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
}
