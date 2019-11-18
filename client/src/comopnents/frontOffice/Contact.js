import React, { Component, Fragment } from "react";
import "./contact.css";
import NavBar from "./NavBar";
import { Button, Icon } from "antd";
import { postMessage } from "../../actions/MessageAction";
import { connect } from "react-redux";
class ContactAdmin extends Component {
  state = {
    contain: "",
    subject: "",
    email: "",
    name: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  action = () => {
    this.setState({
      contain: "",
      subject: "",
      email: "",
      name: ""
    });
  };
  onSubmit = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      contain: this.state.contain
    };
    this.props.postMessage(data, this.action);
  };
  render() {
    return (
      <Fragment>
        <NavBar />
        <main className="contact-Container">
          <div>
            {" "}
            <h1>
              CONTACTEZ <br />
              NOUS{" "}
            </h1>{" "}
          </div>

          <form className="contactForm">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              placeholder="Nom.."
              onChange={this.handleChange}
              value={this.state.name}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email.."
              onChange={this.handleChange}
              value={this.state.email}
            />
            <span style={{ color: "red" }}>{this.props.errors.email}</span>

            <label>Titre</label>
            <input
              type="text"
              name="subject"
              placeholder="Titre.."
              onChange={this.handleChange}
              value={this.state.subject}
            />
            <span style={{ color: "red" }}>{this.props.errors.subject}</span>
            <label>Message</label>
            <textarea
              name="contain"
              placeholder="Votre message.."
              onChange={this.handleChange}
              rows="5"
              value={this.state.contain}
            />
            <span style={{ color: "red" }}>{this.props.errors.contain}</span>

            <Button type="primary" onClick={this.onSubmit}>
              Envoyer
              <Icon type="arrow-right" />
            </Button>
          </form>
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { postMessage }
)(ContactAdmin);
