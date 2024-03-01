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

  // Переделать

  useEffect(() => {
    
    if (ref.current) {
      // if (ref.current.style.opacity !== 'flex') {
      //   ref.current.style.display = 'flex'
      //   return
      // }
      if (!ref.current.classList.contains(styles.opacity_0)) {
        ref.current.classList.add(styles.opacity_0)
        ref.current.style.display = 'flex'
        return
      }
      if (sidebarOpen) {
        ref.current.classList.add(styles.show)
        ref.current.classList.remove(styles.hide)
      } else {
        ref.current.classList.add(styles.hide)
        ref.current.classList.remove(styles.show)
      }
    }
  }, [sidebarOpen])
  
  return (
    <nav className={[styles.container].join(' ')} ref={ref}>
      <div className={styles.links}>
        <Link href="/house" legacyBehavior>
          <a className={pathname === "/house" ? styles.active : ' '}>
            Домики
          </a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={pathname === "/about" ? styles.active : ' '}>
            Об отеле
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
