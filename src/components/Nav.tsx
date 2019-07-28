import * as React from 'react'
import { Link } from 'gatsby'

type NavItem = {
  link: string
  title: string
}

const navItems: NavItem[] = [
  { link: '/', title: 'Startseite' },
  { link: '/erich-schickling/', title: 'Erich Schickling' },
  { link: '/werke/', title: 'Werke' },
  { link: '/foerderkreis/', title: 'Förderkreis' },
  { link: '/veranstaltungen/', title: 'Veranstaltungen' },
  { link: '/kontakt/', title: 'Kontakt' },
]

export default ({ pathname }: { pathname: string }) => {
  return (
    <div id="nav">
      <ul id="first">
        {navItems.slice(0, 1).map(navItem => renderNavItem(navItem, pathname))}
      </ul>
      <ul id="second">
        {navItems.slice(1).map(navItem => renderNavItem(navItem, pathname))}
      </ul>
    </div>
  )
}

const renderNavItem = (navItem: NavItem, pathname: string) => (
  <li key={navItem.title}>
    <Link
      className={isActive(navItem.link, pathname) ? 'active' : ''}
      to={navItem.link}
    >
      {navItem.title}
    </Link>
  </li>
)

const isActive = (link: string, pathname: string): boolean => {
  if (link === '/') {
    return link === pathname
  }
  return pathname.startsWith(link)
}
