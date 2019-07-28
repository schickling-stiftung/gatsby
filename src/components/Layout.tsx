import { Link } from 'gatsby'
import * as React from 'react'
import '../css/styles.css'

export interface LayoutProps {
  location: {
    pathname: string
  }
  children: any
  header: any
  footer: any
}

const Layout = (props: LayoutProps) => {
  const { pathname } = props.location
  const isHome = pathname === '/'

  return <>{props.children}</>
}

export default Layout

export const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) =>
  class WithLayout extends React.Component<P & LayoutProps> {
    render() {
      return (
        <Layout location={this.props.location}>
          <WrappedComponent {...this.props} />
        </Layout>
      )
    }
  }
