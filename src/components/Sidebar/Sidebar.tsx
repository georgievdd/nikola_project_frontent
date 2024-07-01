import styles from './Sidebar.module.scss'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {

  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      if (sidebarOpen) {
        ref.current.style.display = 'flex'
        ref.current.classList.add(styles.show)
        ref.current.classList.remove(styles.hide)
      } else {
        ref.current.classList.add(styles.hide)
        ref.current.classList.remove(styles.show)
        setTimeout(() => {ref.current!.style.display = 'none'}, 350)
      }
    }
  }, [sidebarOpen])
  
  return (
    <nav className={[styles.container].join(' ')} ref={ref}>
      <div className={styles.links}>
        <Link href="/" legacyBehavior>
          <a className={pathname === "/" ? styles.active : ' '}>
            Главная
          </a>
        </Link>
        <Link href="/house" legacyBehavior>
          <a className={pathname === "/house" ? styles.active : ' '}>
            Домики
          </a>
        </Link>
        <Link href="/service" legacyBehavior>
          <a className={pathname === "/service" ? styles.active : ' '}>
            Услуги
          </a>
        </Link>
      </div>
    </nav>
  )

}

export default Sidebar;
