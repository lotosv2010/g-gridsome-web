// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const collection = addCollection('Post')

    const { data } = await axios.get('https://api.realworld.io/api/articles')

    for (const item of data.articles) {
      collection.addNode({
        id: item.slug,
        title: item.title,
        content: item.body,
        description: item.description,
        tagList: item.tagsList,
        createdAt: item.createdAt,
        author: item.author
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
