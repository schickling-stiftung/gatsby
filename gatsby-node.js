const path = require('path')
const fs = require('fs')
const slash = require('slash')
const { kebabCase, uniq, get, compact, times } = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)

// Don't forget to update hard code values into:
// - `templates/blog-page.tsx:23`
// - `pages/blog.tsx:26`
// - `pages/blog.tsx:121`
const POSTS_PER_PAGE = 10
const cleanArray = arr => compact(uniq(arr))

// Create slugs for files.
// Slug will used for blog page path.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug, header
  switch (node.internal.type) {
    case `MarkdownRemark`:
      // slug
      const fileNode = getNode(node.parent)
      slug = ('/' + fileNode.relativePath).replace('/index.md', '/')

      // find header.jpg
      // if (!slug.endsWith('.md')) {
      //   let p = slug.replace(/^\//, '')
      //   // header path
      //   while (!header) {
      //     const f = p + '/header.jpg'
      //     if (fs.existsSync('data/' + f)) {
      //       header = f
      //     } else {
      //       p = p
      //         .split('/')
      //         .slice(0, -1)
      //         .join('/')
      //       if (p === '') {
      //         break
      //       }
      //     }
      //   }
      // }

      break
  }
  if (slug) {
    createNodeField({ node, name: 'slug', value: slug })
  }
  // if (header) {
  //   const relativeFilePath = createFilePath({
  //     node,
  //     getNode,
  //     basePath: header,
  //   })
  //   console.log({ header, relativeFilePath })

  //   createNodeField({ node, name: 'header', value: relativeFilePath })
  // }
}

// Implement the Gatsby API `createPages`.
// This is called after the Gatsby bootstrap is finished
// so you have access to any information necessary to
// programatically create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const templates = ['articlePost', 'imagePost'].reduce(
      (mem, templateName) => {
        return Object.assign({}, mem, {
          [templateName]: path.resolve(
            `src/templates/${kebabCase(templateName)}.tsx`,
          ),
        })
      },
      {},
    )

    graphql(
      `
        {
          posts: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  layout
                }
              }
            }
          }
        }
      `,
    ).then(result => {
      if (result.errors) {
        return reject(result.errors)
      }
      const posts = result.data.posts.edges.map(p => p.node)

      // Create article pages
      posts.forEach(post => {
        const template =
          post.frontmatter.layout === 'image'
            ? templates.imagePost
            : templates.articlePost
        createPage({
          path: post.fields.slug,
          component: slash(template),
          context: {
            slug: post.fields.slug,
          },
        })
      })

      // Create blog pages
      // posts
      //   .filter(post => post.fields.slug.startsWith('/blog/'))
      //   .forEach(post => {
      //     createPage({
      //       path: post.fields.slug,
      //       component: slash(templates.blogPost),
      //       context: {
      //         slug: post.fields.slug
      //       }
      //     });
      //   });

      // Create tags pages
      // posts
      //   .reduce((mem, post) =>
      //     cleanArray(mem.concat(get(post, 'frontmatter.tags')))
      //   , [])
      //   .forEach(tag => {
      //     createPage({
      //       path: `/blog/tags/${kebabCase(tag)}/`,
      //       component: slash(templates.tagsPage),
      //       context: {
      //         tag
      //       }
      //     });
      //   });

      // Create blog pagination
      // const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
      // times(pageCount, index => {
      //   createPage({
      //     path: `/blog/page/${index + 1}/`,
      //     component: slash(templates.blogPage),
      //     context: {
      //       skip: index * POSTS_PER_PAGE
      //     }
      //   });
      // });

      resolve()
    })
  })
}
