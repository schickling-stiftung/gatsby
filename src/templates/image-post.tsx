import * as React from 'react'
import { Link } from 'gatsby'
import { Container, Segment } from 'semantic-ui-react'
import { TemplateArticleImageQuery } from '../graphql-types'
import { DiscussionEmbed } from 'disqus-react'
import { withLayout, LayoutProps } from '../components/Layout'
import { graphql } from 'gatsby'
import Nav from '../components/Nav'
import { Helmet } from 'react-helmet'

interface ArticleImageProps extends LayoutProps {
  data: TemplateArticleImageQuery
}

const ArticleImagePage = (props: ArticleImageProps) => {
  const { frontmatter, html } = props.data.post

  return (
    <Container>
      <Helmet defaultTitle={`${frontmatter.title} - Schickling Stiftung`} />
      <div id="main">
        <div id="header">
          <div id="headerImage" />
          <div id="logoWrapper">
            <div id="logo" />
            <div id="logoTitle">Begegnung von Kunst und Religion</div>
          </div>
        </div>
        <Nav />
        <div id="recentHead">Aktuelles</div>
        <div id="contentWrapper" style={{ padding: 0 }}>
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
          <div id="imageText" className="text">
            <Segment
              vertical
              style={{ border: 'none' }}
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default withLayout(ArticleImagePage)

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
