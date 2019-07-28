import * as React from 'react'
import { Link } from 'gatsby'

type NavItem = {
  link?: string
  text?: string
}

type Props = {
  pathname: string
  subnav?: NavItem[] | null
}

export default ({ pathname, subnav }: Props) => (
  <div id="subnav">
    <ul>
      {subnav &&
        subnav.map(el => <li key={el.link}>{renderLink(el, pathname)}</li>)}
    </ul>
  </div>
)

const renderLink = (el: NavItem, pathname: string) => {
  if (el.link.startsWith('http')) {
    return (
      <a
        className={pathname === el.link ? 'active' : ''}
        href={el.link}
        target="_blank"
      >
        {el.text}
      </a>
    )
  }
  return (
    <Link className={pathname === el.link ? 'active' : ''} to={el.link}>
      {el.text}
    </Link>
  )
}
