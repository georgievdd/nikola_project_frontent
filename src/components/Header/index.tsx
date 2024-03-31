'use client'

import styles from './Header.module.scss'
import Image from 'next/image'
import LogoImg from '../../../public/images/logo-with-letters.svg'
import Link from 'next/link'
import Burger from '../Burger/Burger'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Logo = () => {
  return (
    <div>
      <Image
        className={styles.logo}
        src={LogoImg}
        alt=''
        height={50}
      />
    </div>
  )
}

const Header = (props: HeaderProps) => {

  const pathname = usePathname()

  return (
    <header className={styles.container}>
      <nav className={styles.data}>
        <Logo />
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
      </nav>
      <label className={styles.burger}>
        <Burger {...props}/>
      </label>
    </header>
  );
};

export default Header;
