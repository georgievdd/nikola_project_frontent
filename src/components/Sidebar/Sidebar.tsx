import {useEffect, useRef} from 'react'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const css = require('src/helpers').importStyles(
  require('./Sidebar.module.scss'),
)

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      if (sidebarOpen) {
        ref.current.style.display = 'flex'
        ref.current.classList.add(css`show`)
        ref.current.classList.remove(css`hide`)
      } else {
        ref.current.classList.add(css`hide`)
        ref.current.classList.remove(css`show`)
        setTimeout(() => {
          ref.current!.style.display = 'none'
        }, 350)
      }
    }
  }, [sidebarOpen])

  return (
    <nav className={css`container`} ref={ref}>
      <div className={css`links`}>
        <Link href="/" legacyBehavior>
          <a className={pathname === '/' ? css`active` : ' '}>Главная</a>
        </Link>
        <Link href="/house" legacyBehavior>
          <a className={pathname === '/house' ? css`active` : ' '}>Домики</a>
        </Link>
        <Link href="/service" legacyBehavior>
          <a className={pathname === '/service' ? css`active` : ' '}>Услуги</a>
        </Link>
      </div>
    </nav>
  )
}

export default Sidebar
