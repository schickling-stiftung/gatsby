import * as React from 'react'
import Nav from './Nav'
import header from '../../data/header.jpg'

export default ({ pathname }: { pathname: string }) => (
  <>
    <div id="header">
      <div id="headerImage">
        <img src={header} />
        {/* <img src={props.data.post.fields.header} alt="" /> */}
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
