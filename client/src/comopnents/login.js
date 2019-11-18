import React from "react";

import "antd/dist/antd.css";
import { loginUser } from "../actions/authActions";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class NormalLoginForm extends React.Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = { email: values.username, password: values.password };
        this.props.loginUser(obj);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <main className="login-form-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <span>
                <Input
                  prefix={
                    <Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  autoComplete="@gmail.com"
                  placeholder="email"
                  // name="email"
                  // value={this.state.eamil}
                  // onChange={this.handleChange}
                />
                <div style={{ color: "red" }}>
                  {this.props.errors.email === undefined
                    ? null
                    : this.props.errors.email}
                </div>
              </span>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <span>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  // name="Password"
                  // value={this.state.password}
                  // onChange={this.handleChange}
                />
                <div style={{ color: "red" }}>
                  {this.props.errors.password === undefined
                    ? null
                    : this.props.errors.password}
                </div>
              </span>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </main>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(WrappedNormalLoginForm));
