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
        subnav.map(el => (
          <li key={el.link}>
            <Link className={pathname === el.link ? 'active' : ''} to={el.link}>
              {el.text}
            </Link>
          </li>
        ))}
    </ul>
  </div>
)
