'use client'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

import Burger from 'components/Burger/Burger'
import LogoImg from 'images/logo-with-letters.svg'

import styles from './Header.module.scss'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

const Logo = () => {
  return (
    <div>
      <Image className={styles.logo} src={LogoImg} alt="" height={30} />
    </div>
  )
}

const Header = (props: HeaderProps) => {
  const pathname = usePathname()

  return (
    <header className={styles.container}>
      <nav className={styles.data}>
        <Link href="/">
          <Logo />
        </Link>
        <Link href="/house" legacyBehavior>
          <a className={pathname === '/house' ? styles.active : ' '}>Домики</a>
        </Link>
        <Link href="/service" legacyBehavior>
          <a className={pathname === '/service' ? styles.active : ' '}>
            Услуги
          </a>
        </Link>
      </nav>
      <label className={styles.burger}>
        <Burger {...props} />
      </label>
    </header>
  )
}

export default Header
