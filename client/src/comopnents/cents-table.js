import React from "react";
import "antd/dist/antd.css";
import AddProfil from "./add-profil";
import { Avatar } from "antd";
import profilePicture from "./img/profileImage_nonGender-220.png";

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
  getPersons,
  updatePerson,
  deletePersons
} from "../actions/centActions";
import { connect } from "react-redux";

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
const EditableContext = React.createContext();

/*** ediitable input component */
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    } else if (this.props.inputType === "select") {
      return (
        <select className="select-tag">
          <option />
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      );
    } else if (this.props.inputType === "textarea") {
      return <Input.TextArea rows={6} cols={10} />;
    } else if (this.props.inputType === "selectCountry") {
      return (
        <select className="select-tag">
          {countryList.map(el => (
            <option value={el}> {el}</option>
          ))}
        </select>
      );
    } else if (this.props.inputType === "upload") {
      return (
        <input
          type="file"
          className="custom-file-input"
          onChange={e => {
            const formData = new FormData();
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
      test,
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
    editingKey: ""
  };
  fileState = val => {
    this.setState({
      files: val
    });
  };
  componentWillMount = () => {
    this.props.getPersons();
  };
  /** upload method */

  handleUpload = e => {
    const { fileList } = this.state;
    const formData = new FormData();

    formData.append("photo", e.target.files[0]);
    // const formData = { photo: this.state.file };

    this.setState({
      files: formData
    });
  };

  /** end upload method */
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

    formData.append("photo", this.state.files);

    formData.set("country", form.getFieldsValue().country);
    formData.set("name", form.getFieldsValue().name);
    formData.set("bio", form.getFieldsValue().bio);
    formData.set("chief", form.getFieldsValue().chief);

    this.props.updatePerson(key, formData, () => {
      this.setState({ files: "" });
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
        title: "Photo",
        dataIndex: "photo",
        key: "photo",
        className: "photo"
      },
      {
        title: "Nom et Prénom",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
        editable: true
      },

      {
        title: "Pays",
        dataIndex: "country",
        key: "country",
        ...this.getColumnSearchProps("country"),
        editable: true
      },
      {
        title: "Chef",
        dataIndex: "chief",
        key: "chief",
        ...this.getColumnSearchProps("chief"),
        editable: true
      },

      {
        title: "Biographie",
        dataIndex: "bio",
        key: "bio",
        className: "widh-textarea",
        ...this.getColumnSearchProps("bio"),
        editable: true,
        hideOn: false
        // className: "test",
      },
      {
        title: "Ajouter une photo",
        dataIndex: "addPhoto",
        key: "addPhoto",

        editable: true,
        hideOn: false
        // className: "test",
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
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.key)}
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
          inputType:
            col.dataIndex === "age"
              ? "number"
              : col.dataIndex === "chief"
              ? "select"
              : col.dataIndex === "addPhoto"
              ? "upload"
              : col.dataIndex === "bio"
              ? "textarea"
              : col.dataIndex === "country"
              ? "selectCountry"
              : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    const data = [];
    for (let i = 0; i < this.props.centList.length; i++) {
      data.push({
        key: i,
        key: this.props.centList[i]._id,
        photo: (
          <Avatar
            size="large"
            icon="user"
            src={
              this.props.centList[i].photo
                ? `http://mediterraneedestalents.org/${
                    this.props.centList[i].photo
                  }`
                : profilePicture
            }
            className="ava"
          />
        ),
        name: this.props.centList[i].name ? this.props.centList[i].name : " ",

        country: this.props.centList[i].country
          ? this.props.centList[i].country
          : " ",
        chief: this.props.centList[i].chief,
        bio: this.props.centList[i].bio ? this.props.centList[i].bio : " "
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
                <span>{`${selectedRowKeys.length} selectionner `}</span>
                <Icon
                  type="delete"
                  style={{ fontSize: 25 }}
                  onClick={() => {
                    this.props.deletePersons(rowSelection.selectedRowKeys);
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
            <AddProfil />
          </div>
        </div>
        <EditableContext.Provider value={this.props.form}>
          <Table
            expandedRowRender={record => (
              <p style={{ margin: 0 }}>{record.bio}</p>
            )}
            components={components}
            rowSelection={rowSelection}
            columns={neWcolumns}
            loading={loading}
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
const AppWithForm = Form.create()(App);

const mapStateToProps = state => {
  return {
    centList: state.Cent.centList,
    loading: state.Cent.loading
  };
};

export default connect(
  mapStateToProps,
  { getPersons, updatePerson, deletePersons }
)(AppWithForm);
