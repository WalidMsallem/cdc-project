import React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { addProject } from "../actions/projectsAction";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon
} from "antd";

const { Option } = Select;
const thematics = [
  " ",
  "Culture Tourisme et Media",
  "Environnement et développement durable",
  "Economie et compétitivité",
  "Jeunesse, éducation et mobilité"
];
const countryList = [
  " ",
  "Espagne",
  "France",
  "Italie",
  "Malte",
  "Portugal",
  "Algérie",
  "Libye",
  "Mauritanie",
  "Tunisie",
  "Maroc"
];
class DrawerForm extends React.Component {
  state = {
    visible: false,
    organizer: "",
    title: "",
    email: "",
    country: "",
    thematic: "",
    validEmail: "false",
    description: "",
    file: {}
  };
  handleUpload = e => {
    this.setState(
      {
        file: e.target.files
      },
      () => {
        console.log("hello");
        console.log(this.state.file.length, "this.state.file");
      }
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
    console.log(this.state.file, "file sttttt");
    if (this.state.file.length === undefined) {
      /* create with out upload photo */
      console.log(this.state.file, "no");
      const projectData = {
        organizer: this.state.organizer,
        title: this.state.title,
        email: this.state.email,
        country: this.state.country,
        thematic: this.state.thematic,
        validEmail: this.state.validEmail,
        description: this.state.description
      };
      console.log(projectData, "projectData");
      this.props.addProject(projectData, this.onClose);
    } else if (this.state.file.length == 1) {
      const formData = new FormData();
      formData.append("document", this.state.file[0]);
      console.log(this.state.file[0], "yes");
      formData.set("title", this.state.title);
      formData.set("organizer", this.state.organizer);
      formData.set("email", this.state.email);
      formData.set("country", this.state.country);
      formData.set("thematic", this.state.thematic);
      formData.set("validEmail", this.state.validEmail);
      formData.set("description", this.state.description);
      console.log(formData, "profileData");
      this.props.addProject(formData, this.onClose);
    }
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      organizer: "",
      title: "",
      email: "",
      country: "",
      thematic: "",
      validEmail: "false",
      description: "",
      file: {}
    });
  };

  render() {
    console.log(this.state, "this.state");
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.errors.title, "props");
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> Ajouter un projet
        </Button>
        <Drawer
          title="Ajouter un projet"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Titre du Projet">
                  {getFieldDecorator("title", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <span>
                      <Input
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                        placeholder="Titre du Projet"
                      />
                      <div style={{ color: "red" }}>
                        {this.props.errors.title}
                      </div>
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Organisation">
                  {getFieldDecorator("text", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <span>
                      <Input
                        name="organizer"
                        value={this.state.organizer}
                        onChange={this.onChange}
                        placeholder="Organisation"
                      />
                      <div style={{ color: "red" }}>
                        {this.props.errors.organizer}
                      </div>
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator("email", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <span>
                      <Input
                        name="email"
                        onChange={this.onChange}
                        placeholder="Email"
                        value={this.state.email}
                      />
                      <div style={{ color: "red" }}>
                        {this.props.errors.email}
                      </div>
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email visible">
                  {getFieldDecorator("validEmail", {
                    rules: [
                      { required: true, message: "Please select an validEmail" }
                    ]
                  })(
                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="Please select an owner"
                      name="validEmail"
                      className="select-tag"
                    >
                      <option setFieldsValue="true">false</option>
                      <option setFieldsValue="false">true </option>
                    </select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thématique">
                  {getFieldDecorator("theme", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <span>
                      <select
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Please select an owner"
                        name="thematic"
                        className="select-tag"
                      >
                        {thematics.map(el => (
                          <option setFieldsValue={el}>{el}</option>
                        ))}
                      </select>

                      <div style={{ color: "red" }}>
                        {this.props.errors.thematic}
                      </div>
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Pays">
                  {getFieldDecorator("country", {
                    rules: [
                      { required: true, message: "ce champ est obliagtoire" }
                    ]
                  })(
                    <span>
                      <select
                        className="select-tag"
                        onChange={this.handleChange}
                        name="country"
                      >
                        {countryList.map(el => (
                          <option setFieldsValue={el}>{el}</option>
                        ))}
                      </select>
                      {/* <Input
                        value={this.state.country}
                        name="country"
                        onChange={this.onChange}
                        placeholder="country"
                      /> */}
                      <div style={{ color: "red" }}>
                        {this.props.errors.country}
                      </div>
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                Document{" "}
                <input
                  type="file"
                  onChange={this.handleUpload}
                  className="custom-file-input"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Description"
                      }
                    ]
                  })(
                    <Input.TextArea
                      rows={4}
                      value={this.state.description}
                      placeholder="Description"
                      name="description"
                      onChange={this.onChange}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Annuler
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              Soumettre
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
const AddProject = Form.create()(DrawerForm);
export default connect(
  mapStateToProps,
  { addProject }
)(AddProject);
