import * as React from 'react'
import { Link } from 'gatsby'
import { Container, Segment } from 'semantic-ui-react'
import { TemplateArticlePostQuery } from '../graphql-types'
import { withLayout, LayoutProps } from '../components/Layout'
import { graphql } from 'gatsby'
import Nav from '../components/Nav'
import Helmet from 'react-helmet'
import header from '../../data/header.jpg'

interface ArticlePostProps extends LayoutProps {
  data: TemplateArticlePostQuery
}

const ArticlePostPage = (props: ArticlePostProps) => {
  const { frontmatter, html } = props.data.post

  return (
    <Container>
      <Helmet defaultTitle={`${frontmatter.title} - Schickling Stiftung`} />
      <div id="main">
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
        <Nav />
        <div id="recentHead">Aktuelles</div>
        <div id="contentWrapper">
          <div id="subnav">
            <ul>
              {frontmatter.subnav &&
                frontmatter.subnav.map(el => (
                  <li key={el.link}>
                    <a
                      className={
                        props.location.pathname === el.link ? 'active' : ''
                      }
                      href={el.link}
                    >
                      {el.text}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div id="content" className="text">
            <Segment
              vertical
              style={{ border: 'none' }}
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </div>
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
    </Container>
  )
}

export default withLayout(ArticlePostPage)

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
