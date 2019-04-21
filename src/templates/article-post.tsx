import * as React from "react";
import { Link } from "gatsby";
import { get } from "lodash";
import { Header, Container, Segment, Icon, Label, Button, Grid, Card, Image, Item, Comment } from "semantic-ui-react";
import { TemplateArticlePostQuery } from "../graphql-types";
import { DiscussionEmbed } from "disqus-react";
import {withLayout, LayoutProps} from "../components/Layout";
import { graphql } from "gatsby";
import Nav from "../components/Nav";

interface ArticlePostProps extends LayoutProps {
  data: TemplateArticlePostQuery;
}

const ArticlePostPage = (props: ArticlePostProps) => {
  const { frontmatter, html } = props.data.post;

  console.log(frontmatter);

  const cover = get(frontmatter, "image.children.0.fixed", {} );
  return (
    <Container>
      <div id="main">
        <div id="header">
            <div id="headerImage">
                {/* <img src="<%= header_path(item) %>" alt="" /> */}
            </div>
            <div id="logoWrapper">
                <div id="logo"></div>
                <div id="logoTitle">Begegnung von Kunst und Religion</div>
            </div>
        </div>
        <Nav />
        {/* <%= render 'nav' %> */}
        <div id="recentHead">
            Aktuelles
        </div>
        <div id="contentWrapper">
            <div id="subnav">
                <ul>
                    {/* <% if item[:subnav] %>
                    <% item[:subnav].each do |el| %>
                    <li><a className="<% if item.identifier == el[:link] %>active<% end %>" href="<%= el[:link] %>"><%= el[:text] %></a></li>
                    <% end %>
                    <% end %> */}
                </ul>
            </div>
            <div id="content" className="text">
                {/* <%= yield %> */}
                <Segment vertical
                  style={{ border: "none" }}
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                />
            </div>
            <div id="recent" className="text" dangerouslySetInnerHTML={{ __html: props.data.aktuelles.html }} />
        </div>
        <div id="footer">
            <div id="gallery">
                  {frontmatter.images && frontmatter.images.map(({ file }) => (
                    <a href={file.childImageSharp.original.src}>
                      <img src={file.childImageSharp.original.src} />
                    </a>
                  ))}
            </div>
            {frontmatter.thought &&
              <div id="footerNote">
                  <a href={frontmatter.thought}>Bildgedanke</a>
              </div>
            }
        </div>
    </div>
    </Container>
  );
};

export default withLayout(ArticlePostPage);

export const pageQuery = graphql`
  query TemplateArticlePost($slug: String!) {
  aktuelles: markdownRemark(fields: {slug: {eq: "/aktuelles.md"}}) {
    html
  }
  post: markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    frontmatter {
      title
      thought
      images {
        file {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
      # tags
      # author {
      #   id
      #   bio
      #   twitter
      #   avatar {
      #     children {
      #       ... on ImageSharp {
      #         fixed(width: 80, height: 80, quality: 100) {
      #           src
      #           srcSet
      #         }
      #       }
      #     }
      #   }
      # }
      # title
      # updatedDate(formatString: "MMM D, YYYY")
      # image {
      #   children {
      #     ... on ImageSharp {
      #       fixed(width: 900, height: 300, quality: 100) {
      #         src
      #         srcSet
      #       }
      #     }
      #   }
      # }
    }
  }
}
`;
