import React, { Component } from "react"
import "./Result.css"
import moment from "moment"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table } from "react-bootstrap"

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: {}
    }
  }

  componentDidMount() {
    fetch("/api/parser")
      .then((res) => res.json())
      .then((results) => this.setState({ result: results }))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.result !== nextProps.result) {
      this.setState({
        result: nextProps.result
      })
    }
  }

  render() {
    const {
      urlResponse,
      title,
      htmlVersion,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      images,
      links,
      scriptStart,
      scriptEnd
    } = this.state.result

    let executionTime = moment(scriptEnd).toDate() - moment(scriptStart).toDate()

    Object.size = function(obj) {
      var size = 0,
        key
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++
      }
      return size
    }

    var linksCount = Object.size(links)
    var imagesCount = Object.size(images)

    let intExtCheking = (currentUrl) => {
      var re = new RegExp(this.props.url, "i")
      return re.test(currentUrl)
    }

    let intExtCounter = () => {
      let intCount = 0
      let extCount = 0
      // eslint-disable-next-line
      links.map((res, i) => {
        intExtCheking(res.url) ? intCount++ : extCount++
      })
      return { intCount, extCount }
    }

    let brokenLinkCounter = () => {
      let brokenLinks = 0
      // eslint-disable-next-line
      links.map((res, i) => {
        if (res.status !== 200) {
          brokenLinks++
        }
      })
      return brokenLinks
    }

    let maxImage = () => {
      var res = Math.max.apply(
        Math,
        images.map((image) => image.size)
      )
      var obj = images.find((image) => {
        return image.size === res
      })
      return obj.img
    }

    let content

    if (urlResponse === 200) {
      content = (
        <div>
          <h2>Results</h2>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>URL response code</td>
                  <td>{urlResponse}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{title}</td>
                </tr>
                <tr>
                  <td>HTML version</td>
                  <td>{htmlVersion}</td>
                </tr>
                <tr>
                  <td>Headings</td>
                  <td>
                    H1:{h1} H2:{h2} H3:{h3} H4:{h4} H5:{h5} H6:{h6}
                  </td>
                </tr>
                <tr>
                  <td>Links count</td>
                  <td>
                    {linksCount}: Int({intExtCounter().intCount}) Ext(
                    {intExtCounter().extCount}) Broken({brokenLinkCounter()})
                  </td>
                </tr>
                <tr>
                  <td>Images count</td>
                  <td>
                    {imagesCount} with larges: {maxImage()}
                  </td>
                </tr>
                <tr>
                  <td>Execution time</td>
                  <td>{executionTime} ms</td>
                </tr>
              </tbody>
            </Table>
            <h2>Data</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Link</th>
                  <th>Type</th>
                  <th>Response code</th>
                </tr>
              </thead>
              <tbody>
                {links &&
                  links.map((res, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <th>{res.url}</th>
                      <th>{intExtCheking(res.url) ? "Int" : "Ext"}</th>
                      <th>{res.status}</th>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Picture</th>
                  <th>Size KB</th>
                </tr>
              </thead>
              <tbody>
                {images &&
                  images.map((res, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <th>{res.img}</th>
                      <th>{res.size / 1000}</th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      )
    } else if (urlResponse === "") {
      content = <div>Please parse new URL</div>
    } else {
      content = <div>This link can't be parsed</div>
    }

    return <div>{content}</div>
  }
}

export default Result
