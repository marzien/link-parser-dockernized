const axios = require("axios")
const cheerio = require("cheerio")
const requestImageSize = require("request-image-size")

module.exports = async function getPictures(siteUrl) {
  const html = await axios.get(siteUrl)
  const $ = cheerio.load(html.data)

  const images = Object.values($("img"))
    .map((el) => {
      return $(el).attr("src")
    })
    .filter((it) => it)

  const imageArr = Promise.all(
    images.map((image) => {
      let imageUrl = siteUrl + "/" + image
      return requestImageSize(imageUrl)
        .then((res) => {
          return { img: imageUrl, size: res.downloaded }
        })
        .catch((err) => `Error: can't get image: {imageUrl} size: {err}`)
    })
  )
    .then((data) => {
      return data
    })
    .catch((err) => `Error: can't get image: {imageUrl} size: {err} `)
  return await imageArr
}
