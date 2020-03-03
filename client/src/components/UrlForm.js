import React, { Component } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap"
import "./UrlForm.css"

class UrlForm extends Component {
  constructor(props) {
    super(props)
    this.state = { url: "https://mariusdev.tech" } //default
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    const data = { url: this.state.url }
    axios
      .post("/api/parser", data)
      .then((res) => {
        this.props.getData(res.data, data.url)
      })
      .catch((err) => console.log("ERROR: can't post URL"))

    this.setState({ url: "" })
  }
  render() {
    return (
      <form className="UrlLinkForm" onSubmit={this.handleSubmit}>
        <label htmlFor="url">Your URL link:</label>
        <Form.Control
          type="text"
          placeholder="https://..."
          id="url"
          name="url"
          value={this.state.url}
          onChange={this.handleChange}
        />
        <br></br>
        <Button type="submit" variant="info">
          Parse!
        </Button>
      </form>
    )
  }
}

export default UrlForm
