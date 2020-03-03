const axios = require("axios")
const cheerio = require("cheerio")
const fetch = require("node-fetch")

module.exports = async function getLinks(siteUrl) {
  const html = await axios.get(siteUrl)
  const $ = cheerio.load(html.data)

  const links = Object.values($("a"))
    .map((el) => {
      return $(el).attr("href")
    })
    .filter((it) => it)

  const linkArr = Promise.all(
    links.map((url) => {
      return fetch(
        url.includes("http")
          ? url
          : url.includes("index.html")
          ? siteUrl + "/" + url
          : siteUrl + url
      )
        .then((res) => {
          return { url: res.url, status: res.status }
        })
        .catch((err) => `Error: can't fetch page link: {url} {err}`)
    })
  )
    .then((data) => {
      return data
    })
    .catch((err) => `Error: can't fetch page links {err}`)

  return await linkArr
}
