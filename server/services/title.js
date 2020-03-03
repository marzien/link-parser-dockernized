const axios = require("axios")
const cheerio = require("cheerio")

module.exports = async function getTitle(url) {
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  return $("title").text()
}
