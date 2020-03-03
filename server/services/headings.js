const axios = require("axios")
const cheerio = require("cheerio")

module.exports = async function getHeadings(url) {
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  let data = []

  let h1count = 0
  let h2count = 0
  let h3count = 0
  let h4count = 0
  let h5count = 0
  let h6count = 0

  $("h1").each((i, el) => {
    h1count += 1
  })

  $("h2").each((i, el) => {
    h2count += 1
  })

  $("h3").each((i, el) => {
    h3count += 1
  })

  $("h4").each((i, el) => {
    h4count += 1
  })

  $("h5").each((i, el) => {
    h5count += 1
  })

  $("h6").each((i, el) => {
    h6count += 1
  })

  return {
    h1: h1count,
    h2: h2count,
    h3: h3count,
    h4: h4count,
    h5: h5count,
    h6: h6count
  }
}
