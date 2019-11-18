import React, { Component } from "react";
import { getMessages } from "../actions/MessageAction";
import { connect } from "react-redux";
import "antd/dist/antd.css";

import { Card, Col, Row } from "antd";
const cardHeader = (object, name, email, date) => (
  <div>
    <div id="contact-Object">{object}</div>
    <div>
      <span id="contact-Name">{name}</span>

      <span id="contact-Email"> &lt; {email} > </span>
      <div style={{ fontSize: 14 }}> date : {date.slice(0, 19)}</div>
    </div>
  </div>
);

class ContactAdmin extends Component {
  componentWillMount = () => {
    this.props.getMessages();
  };
  render() {
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          {this.props.messages.map(el => (
            <Col span={8} className="message-card">
              <Card
                title={cardHeader(el.subject, el.name, el.email, el.date)}
                bordered={false}
              >
                {el.contain}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(
  mapDispatchToProps,
  { getMessages }
)(ContactAdmin);
