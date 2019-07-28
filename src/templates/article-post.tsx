import * as React from 'react'
import { Link } from 'gatsby'
import { TemplateArticlePostQuery } from '../graphql-types'
// import { withLayout, LayoutProps } from '../components/Layout'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Subnav from '../components/Subnav'
import '../css/styles.css'

interface ArticlePostProps {
  data: TemplateArticlePostQuery
  location: {
    pathname: string
  }
}

const ArticlePostPage = (props: ArticlePostProps) => {
  const { frontmatter, html } = props.data.post
  const { pathname } = props.location

  return (
    <>
      <Helmet defaultTitle={`${frontmatter.title} - Schickling Stiftung`} />
      <div id="main">
        <Header pathname={props.location.pathname} />

        <div id="contentWrapper">
          <Subnav pathname={pathname} subnav={frontmatter.subnav} />
          <div
            id="content"
            className="text"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div
            id="recent"
            className="text"
            dangerouslySetInnerHTML={{ __html: props.data.aktuelles.html }}
          />
        </div>

        <div id="footer">
          <div id="gallery">
            {frontmatter.images &&
              frontmatter.images.map(({ file }) => (
                <a
                  href={file.childImageSharp.original.src}
                  key={file.childImageSharp.original.src}
                >
                  <img src={file.childImageSharp.resize.src} />
                </a>
              ))}
          </div>
          {frontmatter.thought && (
            <div id="footerNote">
              <Link to={frontmatter.thought}>Bildgedanke</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ArticlePostPage

export const pageQuery = graphql`
  query TemplateArticlePost($slug: String!) {
    aktuelles: markdownRemark(fields: { slug: { eq: "/aktuelles.md" } }) {
      html
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      # fields {
      #   header
      # }
      frontmatter {
        title
        thought
        subnav {
          link
          text
        }
        images {
          file {
            childImageSharp {
              resize(height: 120) {
                src
              }
              original {
                src
              }
            }
          }
        }
      }
    }
  }
`
