import * as React from 'react'
import Nav from './Nav'
import imgStartseite from '../images/header/startseite.jpg'
import imgErichSchickling from '../images/header/erich-schickling.jpg'
import imgFoerderkreis from '../images/header/foerderkreis.jpg'
import imgKontakt from '../images/header/kontakt.jpg'
import imgVeranstaltungen from '../images/header/veranstaltungen.jpg'

export default ({
  pathname,
  showHeader,
}: {
  pathname: string
  showHeader: boolean
}) => (
  <>
    <div id="header">
      <div id="headerImage">
        {showHeader && <img src={getImage(pathname)} />}
      </div>
      <div id="logoWrapper">
        <div id="logo" />
        <div id="logoTitle">Begegnung von Kunst und Religion</div>
      </div>
    </div>
    <Nav pathname={pathname} />
    <div id="recentHead">Aktuelles</div>
  </>
)

const getImage = (pathname: string) => {
  if (pathname === '/') {
    return imgStartseite
  }
  if (pathname.startsWith('/erich-schickling')) {
    return imgErichSchickling
  }
  if (pathname.startsWith('/foerderkreis')) {
    return imgFoerderkreis
  }
  if (pathname.startsWith('/kontakt')) {
    return imgKontakt
  }
  if (pathname.startsWith('/veranstaltungen')) {
    return imgVeranstaltungen
  }
}
