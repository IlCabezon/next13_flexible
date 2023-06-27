import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export default function layout({children}: Props) {
  return (
    <div>
      <div>layout</div>
      {children}
    </div>
  )
}