// https://html.com/tags/doctype/

const axios = require("axios")

const html_5 = /!doctype html/
const html_old = /!doctype html public/
const html_401_strict = /html 4.01/
const html_401_transitional = /html 4.01 transitional/
const html_401_frameset = /html 4.01 frameset/
const xhtml_10_strict = /xhtml 1.0 strict/
const xhtml_10_transitional = /xhtml 1.0 transitional/
const xhtml_10_frameset = /xhtml 1.0 frameset/
const xhtml_11 = /xhtml 1.1/

module.exports = async function getHtmlVersion(url) {
  const html = await axios.get(url)
  let htmlContent = html.data.toLowerCase()

  if (html_5.test(htmlContent)) {
    return "HTML 5"
  } else if (html_old.test(htmlContent) && html_401_strict.test()) {
    return "HTML 4.01 Strict"
  } else if (html_old.test(htmlContent) && html_401_transitional.test()) {
    return "HTML 4.01 Transitional"
  } else if (html_old.test(htmlContent) && html_401_frameset.test()) {
    return "HTML 4.01 Frameset"
  } else if (html_old.test(htmlContent) && xhtml_10_strict.test()) {
    return "XHTML 1.0 Strict"
  } else if (html_old.test(htmlContent) && xhtml_10_transitional.test()) {
    return "XHTML 1.0 Transitional"
  } else if (html_old.test(htmlContent) && xhtml_10_frameset.test()) {
    return "XHTML 1.0 Frameset"
  } else if (html_old.test(htmlContent) && xhtml_11.test()) {
    return "XHTML 1.1"
  } else {
    return "No version."
  }
}
