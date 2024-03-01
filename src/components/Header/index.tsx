'use client'

import styles from './Header.module.scss'
import Image from 'next/image'
import Logo from '../../../public/images/logo-with-letters.svg'
import Link from 'next/link'
import Burger from '../Burger/Burger'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}



const Header = (props: HeaderProps) => {

  const pathname = usePathname()

  return (
    <header className={styles.container}>
      <nav className={styles.data}>
        <Image
          className={styles.logo}
          src={Logo}
          alt=''
          width={213}
          height={30}
        />
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
