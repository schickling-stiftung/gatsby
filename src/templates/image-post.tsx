import * as React from 'react'
import { TemplateArticleImageQuery } from '../graphql-types'
// import { withLayout, LayoutProps } from '../components/Layout'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import Subnav from '../components/Subnav'
import '../css/styles.css'

interface ArticleImageProps {
  data: TemplateArticleImageQuery
  location: {
    pathname: string
  }
}

const ArticleImagePage = (props: ArticleImageProps) => {
  const { frontmatter, html } = props.data.post
  const { pathname } = props.location

  return (
    <>
      <Helmet defaultTitle={`${frontmatter.title} - Schickling Stiftung`} />
      <div id="main">
        <Header pathname={props.location.pathname} showHeader={false} />

        <div id="contentWrapper" style={{ padding: 0 }}>
          <Subnav pathname={pathname} subnav={frontmatter.subnav} />
          <div id="imageContent">
            <img src={frontmatter.image.childImageSharp.resize.src} />
          </div>
          <div
            id="recent"
            className="text"
            dangerouslySetInnerHTML={{ __html: props.data.aktuelles.html }}
          />
        </div>

        <div id="imageFooter">
          <div id="imageTitle">{frontmatter.title}</div>
          <div
            id="imageText"
            className="text"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  )
}

export default ArticleImagePage

export const pageQuery = graphql`
  query TemplateArticleImage($slug: String!) {
    aktuelles: markdownRemark(fields: { slug: { eq: "/aktuelles.md" } }) {
      html
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subnav {
          link
          text
        }
        image {
          childImageSharp {
            resize(width: 600) {
              src
            }
          }
        }
      }
    }
  }
`
