import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./inputFile.sass";
import {
  Upload,
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
import { addPerson } from "../actions/centActions";
import { connect } from "react-redux";
import { async } from "q";
import isEmpty from "../validation/is-empty";
const { Option } = Select;
const countryList = [
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
    country: "",
    name: "",
    bio: "",
    chief: "",
    fileList: [],
    uploading: false,
    file: {}
  };

  handleUpload = e => {
    this.setState({
      file: e.target.files
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleChange = event => {
    this.setState({ chief: event.target.value });
  };

  onSubmit = () => {
    if (this.state.file.length === undefined) {
      /* create with out upload photo */

      const profileData = {
        country: this.state.country,
        name: this.state.name,
        bio: this.state.bio,
        chief: this.state.chief
      };
      this.props.addPerson(profileData, this.onClose);
    } else if (this.state.file.length == 1) {
      const formData = new FormData();
      formData.append("photo", this.state.file[0]);

      formData.set("country", this.state.country);
      formData.set("name", this.state.name);
      formData.set("bio", this.state.bio);
      formData.set("chief", this.state.chief);

      this.props.addPerson(formData, this.onClose);
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
      country: "",
      name: "",
      bio: "",
      chief: "",
      fileList: [],
      uploading: false,
      file: {}
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> Ajouter un profil
        </Button>
        <Drawer
          title="Ajouter un profil"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Nom et Prénom">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "ce champ est obligatoire" }
                    ]
                  })(
                    <div>
                      <Input
                        name="name"
                        onChange={this.onChange}
                        placeholder="Nom et Prénom"
                        value={this.state.name}
                      />
                      <div style={{ color: "red" }}>
                        {this.props.errors.name}
                      </div>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Chef de file">
                  {getFieldDecorator("chief", {
                    rules: [
                      { required: true, message: "Please if he is a  chief" }
                    ]
                  })(
                    <select
                      // value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="chef"
                      className="select-tag"
                    >
                      <option value="false"> false</option>
                      <option value="true"> true</option>
                    </select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="pays">
                  {getFieldDecorator("country", {
                    rules: [
                      { required: true, message: "ce champ est obligatoire" }
                    ]
                  })(
                    <div>
                      <select
                        className="select-tag"
                        onChange={this.onChange}
                        name="country"
                        value={this.state.country}
                      >
                        <option> </option>
                        {countryList.map(el => (
                          <option value={el}> {el}</option>
                        ))}
                      </select>
                      <div style={{ color: "red" }}>
                        {this.props.errors.country}
                      </div>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                Photo (Formats photo acceptables sont limités au format JPEG,
                JPG ou PNG)
                <label class="upload-zone">
                  <i>&nbsp;</i>
                  <input
                    type="file"
                    onChange={this.handleUpload}
                    className="custom-file-input"
                  />
                </label>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="bio">
                  {getFieldDecorator("bio", {
                    rules: [{ required: false, message: "..." }]
                  })(
                    <div>
                      <Input.TextArea
                        name="bio"
                        onChange={this.onChange}
                        placeholder="Bio"
                        value={this.state.bio}
                      />
                      <div style={{ color: "red" }}>
                        {this.props.errors.bio}
                      </div>
                    </div>
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

const AddProfil = Form.create()(DrawerForm);
export default connect(
  mapStateToProps,
  { addPerson }
)(AddProfil);
