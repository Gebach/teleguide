import { ContainerProps } from '../../types/types'

function Container({ children, classname }: ContainerProps) {
  return <div className={`${classname}`}>{children}</div>
}

export default Container
