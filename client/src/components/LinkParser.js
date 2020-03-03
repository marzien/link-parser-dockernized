import React, { Component } from "react"
import Result from "./Result"
import UrlForm from "./UrlForm"

class LinkParser extends Component {
  constructor(props) {
    super(props)
    this.state = { result: {}, siteUrl: "" }
  }
  handleData = (data, url) => {
    this.setState({ result: data, siteUrl: url })
  }
  render() {
    return (
      <div>
        <UrlForm getData={this.handleData} />
        <Result result={this.state.result} url={this.state.siteUrl} />
      </div>
    )
  }
}

export default LinkParser
