import React from "react";
import "antd/dist/antd.css";
import AddProject from "./add-project";
import {
  Table,
  Button,
  Input,
  Icon,
  InputNumber,
  Popconfirm,
  Form
} from "antd";
import Highlighter from "react-highlight-words";
import {
  getProjects,
  deleteProjects,
  updateProject
} from "../actions/projectsAction";
import { connect } from "react-redux";
const EditableContext = React.createContext();
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
/*** ediitable input component */
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    } else if (this.props.inputType === "select") {
      return (
        <select className="select-tag" onChange={this.props.stateValidEmail}>
          <option setFieldsValue="true">true</option>
          <option setFieldsValue="false">false</option>
        </select>
      );
    } else if (this.props.inputType === "textarea") {
      return <Input.TextArea rows={6} cols={10} />;
    } else if (this.props.inputType === "thematic") {
      return (
        <select className="select-tag" style={{ width: "100% !important" }}>
          {thematics.map(el => (
            <option setFieldsValue={el}>{el}</option>
          ))}
        </select>
      );
    } else if (this.props.inputType === "country") {
      return (
        <select className="select-tag" style={{ width: "100% !important" }}>
          {countryList.map(el => (
            <option setFieldsValue={el}>{el}</option>
          ))}
        </select>
      );
    } else if (this.props.inputType === "upload") {
      return (
        <input
          type="file"
          className="custom-file-input"
          onChange={e => {
            this.setState(
              {
                x: e.target.files[0]
              },
              () => {
                this.props.fileState(this.state.x);
              }
            );
          }}
        />
      );
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
            {/* {dataIndex === "pays" ? <textarea> qsqsqs </textarea> : null} */}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}
/*** ind editable input comopnent */

class App extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    editingKey: "",
    stateValidEmail: ""
  };
  componentWillMount = () => {
    this.props.getProjects();
  };
  stateValidEmail = e => {
    this.setState({
      stateValidEmail: e.target.value
    });
  };
  fileState = val => {
    this.setState({
      files: val
    });
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  /** search feature */
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  /** end search feature */
  isEditing = record => record.key === this.state.editingKey;
  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    const formData = new FormData();
    let document = this.state.files ? this.state.files : "";

    formData.append("document", document);
    formData.set("organizer", form.getFieldsValue().organizer);
    formData.set("title", form.getFieldsValue().title);
    formData.set("email", form.getFieldsValue().email);
    formData.set("country", form.getFieldsValue().country);
    formData.set("thematic", form.getFieldsValue().thematic);

    formData.set("validEmail", form.getFieldsValue().validEmail);
    formData.set("description", form.getFieldsValue().description);

    this.props.updateProject(key, formData);
    this.setState({
      stateValidEmail: ""
    });

    /**requet  post axios here*/
    this.setState({ editingKey: "" });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = [
      {
        title: "Titre du projet",
        dataIndex: "title",
        key: "title",
        ...this.getColumnSearchProps("title"),
        editable: true,
        className: "width-10"
      },
      {
        title: "Organisation",
        dataIndex: "organizer",
        key: "organizer",
        ...this.getColumnSearchProps("organizer"),
        editable: true,
        className: "width-10"
      },
      {
        title: "Adresse eamil",
        dataIndex: "email",
        key: "eamil",
        ...this.getColumnSearchProps("email"),
        editable: true,
        className: "width-10"
      },
      {
        title: "Pays",
        dataIndex: "country",
        key: "country",
        ...this.getColumnSearchProps("country"),
        editable: true,
        className: "width-10"
      },
      {
        title: "Thématique",
        dataIndex: "thematic",
        key: "thematic",
        ...this.getColumnSearchProps("thematic"),
        editable: true,
        className: "width-10"
      },
      {
        title: "Email visible",
        dataIndex: "validEmail",
        key: "validEmail",
        ...this.getColumnSearchProps("validEmail"),
        editable: true
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        className: "widh-textarea",
        ...this.getColumnSearchProps("description"),
        editable: true
      },
      {
        title: "Documents à télecharger",
        dataIndex: "document",
        key: "document"
      },
      {
        title: "Ajouter un document ",
        dataIndex: "uploadDocument",
        editable: true,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);

          return <div>{null}</div>;
        }
      },
      {
        title: "Opération",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);

          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Sauvegarder
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Annuler</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => {
                this.edit(record.key);
              }}
            >
              Modifier
            </a>
          );
        }
      }
    ];

    const neWcolumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          fileState: this.fileState,
          stateValidEmail: this.stateValidEmail,
          inputType:
            col.dataIndex === "age"
              ? "number"
              : col.dataIndex === "validEmail"
              ? "select"
              : col.dataIndex === "description"
              ? "textarea"
              : col.dataIndex === "uploadDocument"
              ? "upload"
              : col.dataIndex === "thematic"
              ? "thematic"
              : col.dataIndex === "country"
              ? "country"
              : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    const data = [];
    for (let i = 0; i < this.props.projectsListe.length; i++) {
      data.push({
        key: this.props.projectsListe[i]._id,
        organizer: this.props.projectsListe[i].organizer
          ? this.props.projectsListe[i].organizer
          : " ",
        document: this.props.projectsListe[i].document ? (
          <a
            href={`http://mediterraneedestalents.org/${
              this.props.projectsListe[i].document
            }`}
            target="_blank"
          >
            {" "}
            Lien{" "}
          </a>
        ) : (
          " "
        ),
        title: this.props.projectsListe[i].title
          ? this.props.projectsListe[i].title
          : " ",
        email: this.props.projectsListe[i].email
          ? this.props.projectsListe[i].email
          : " ",
        country: this.props.projectsListe[i].country
          ? this.props.projectsListe[i].country
          : "",
        thematic: this.props.projectsListe[i].thematic
          ? this.props.projectsListe[i].thematic
          : " ",
        validEmail: this.props.projectsListe[i].validEmail,
        description: this.props.projectsListe[i].description
          ? this.props.projectsListe[i].description
          : " "
      });
    }

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <div className="table-header" style={{ marginBottom: 16 }}>
          {/* <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button> */}
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? (
              <span className="delte-selected-projects">
                {" "}
                <span>{`${selectedRowKeys.length} sélectionner `}</span>
                <Icon
                  type="delete"
                  style={{ fontSize: 25 }}
                  onClick={() => {
                    this.props.deleteProjects(rowSelection.selectedRowKeys);
                    this.setState({
                      selectedRowKeys: []
                    });
                  }}
                />
              </span>
            ) : (
              ""
            )}
          </span>
          <div>
            <AddProject />
          </div>
        </div>
        <EditableContext.Provider value={this.props.form}>
          <Table
            expandedRowRender={record => (
              <p style={{ margin: 0 }}>{record.description}</p>
            )}
            scroll={{ x: 1200 }}
            components={components}
            rowSelection={rowSelection}
            columns={neWcolumns}
            dataSource={data}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel
            }}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectsListe: state.project.projects
  };
};
const AppWithForm = Form.create()(App);

export default connect(
  mapStateToProps,
  { getProjects, deleteProjects, updateProject }
)(AppWithForm);
