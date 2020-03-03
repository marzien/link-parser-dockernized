const express = require("express")
const router = express.Router()

const checkUrl = require("../services/url-validator")
const getHtmlVersion = require("../services/html-version")
const getTitle = require("../services/title")
const getHeadings = require("../services/headings")
const getPictures = require("../services/pictures")
const getLinks = require("../services/links")

let results = {
  urlResponse: "",
  title: "-",
  htmlVersion: "-",
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  images: [],
  links: [],
  scriptStart: "",
  scriptEnd: ""
}

router.get("/", (req, res) => {
  res.json(results)
})

router.post("/", (req, res) => {
  let { url } = req.body

  let results = checkUrl(url)
    .then((res) => {
      return [{ urlResponse: res, start: new Date() }]
    })
    .catch((err) => `Error: havn't pass link checking and start timer: {err}`)
    .then(async (validationRes) => {
      let parserResult = await Promise.all([
        getHtmlVersion(url),
        getTitle(url),
        getHeadings(url),
        getPictures(url),
        getLinks(url)
      ])
        .then((parserResult) => {
          return parserResult
        })
        .catch((err) => `Error: can't pars link: {err}`)
      return validationRes.concat(parserResult)
    })
    .then((res) => {
      return res.concat({ end: new Date() })
    })
    .then((res) => {
      return {
        urlResponse: res[0].urlResponse,
        title: res[2],
        htmlVersion: res[1],
        h1: res[3].h1,
        h2: res[3].h2,
        h3: res[3].h3,
        h4: res[3].h4,
        h5: res[3].h5,
        h6: res[3].h6,
        images: res[4],
        links: res[5],
        scriptStart: res[0].start,
        scriptEnd: res[6].end
      }
    })
    .catch((err) => `Error: can't form response: {err}`)
    .then((results) => {
      res.json(results)
    })
    .catch((err) => `Error: can't post data to front: {err}`)
})

module.exports = router
