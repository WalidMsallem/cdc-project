import NavBar from "./NavBar";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./cent.css";
import {
  Layout,
  Menu,
  Icon,
  Col,
  Row,
  List,
  Input,
  Avatar,
  Checkbox
} from "antd";
import "antd/dist/antd.css";
import spain from "../img/spain-flag-square-icon-64.png";
import morocco from "../img/morocco-flag-square-icon-64.png";
import portugal from "../img/portugal-flag-square-icon-64.png";
import tunisia from "../img/tunisia-flag-square-icon-64.png";
import mauritania from "../img/mauritania-flag-square-icon-64.png";
import malta from "../img/malta-flag-square-icon-64.png";
import libya from "../img/libya-flag-square-icon-64.png";
import algeria from "../img/algeria-flag-square-icon-64.png";
import italy from "../img/italy-flag-square-icon-64.png";
import france from "../img/france-flag-square-icon-64.png";
import MediaControlCard from "./centCard";
import { getPersons } from "../../actions/centActions";
import Spinner from "./spinner";

const Search = Input.Search;

const countries = [
  {
    name: "Algérie",
    flag: algeria
  },
  {
    name: "Espagne",
    flag: spain
  },
  {
    name: "France",
    flag: france
  },
  {
    name: "Italie",
    flag: italy
  },
  {
    name: "Libye",
    flag: libya
  },
  {
    name: "Malte",
    flag: malta
  },
  { name: "Maroc", flag: morocco },
  {
    name: "Mauritanie",
    flag: mauritania
  },
  {
    name: "Portugal",
    flag: portugal
  },
  {
    name: "Tunisie",
    flag: tunisia
  }
];

const plainOptions = [
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

class Cent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chef: false,
      search: "",
      countryFilter: []
    };
  }
  componentDidMount() {
    this.props.getPersons();
  }
  onChange = e => {
    this.setState({
      chef: e.target.checked
    });
  };
  searchValue = e => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  onChangeCheck = checkedValues => {
    this.setState({
      countryFilter: checkedValues
    });
  };

  render() {
    const { SubMenu } = Menu;
    const { cent } = this.props;
    const { Content, Sider } = Layout;
    const { countryFilter, search, chef } = this.state;
    return (
      <Fragment>
        <NavBar />
        <main>
          <Layout>
            <Layout>
              <Sider
                width={250}
                style={{ background: "#fff" }}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                  console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
              >
                <Menu
                  mode="inline"
                  defaultScountryectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  <Search
                    placeholder="SEARCH"
                    onChange={this.searchValue}
                    style={{
                      marginLeft: "20px",
                      width: "90%",
                      marginBottom: "10px"
                    }}
                  />
                  <Menu.Item key="0">
                    <Icon type="user" />
                    <Checkbox onChange={this.onChange}>Chef de file</Checkbox>
                  </Menu.Item>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <Icon type="flag" />
                        Pays
                      </span>
                    }
                  >
                    <Checkbox.Group
                      style={{ paddingLeft: "48px", width: "90%" }}
                      options={plainOptions}
                      onChange={this.onChangeCheck}
                    />
                  </SubMenu>
                </Menu>
              </Sider>

              <Layout className="page-layout">
                <Row type="flex">
                  <Col span={21}>
                    {!cent.length > 0 ? (
                      <Spinner />
                    ) : (
                      <Content
                        style={{
                          background: "#fff",
                          margin: 0,
                          minWidth: "fit-content"
                        }}
                      >
                        {/* this is where we're filtering the countries without data and without matching names (while searching) */}
                        <List
                          pagination={{
                            onChange: page => {
                              console.log(page);
                            },
                            pageSize: 3
                          }}
                          dataSource={countries.filter(
                            country =>
                              cent
                                .filter(el => {
                                  return !countryFilter.length
                                    ? el
                                    : countryFilter
                                        .map(e => e.toLowerCase())
                                        .includes(el.country.toLowerCase());
                                })
                                .filter(
                                  item =>
                                    item.country.toLowerCase() ===
                                      country.name.toLowerCase() &&
                                    item.name.toLowerCase().includes(search)
                                ).length > 0
                          )}
                          renderItem={country => (
                            <List.Item
                              className="country-list"
                              key={country.name}
                              style={{ marginBottom: "20px" }}
                            >
                              <section>
                                <div className="country">
                                  <Avatar
                                    src={country.flag}
                                    className="flag-avatar"
                                    size="small"
                                  />
                                  <h2>{country.name.toUpperCase()}</h2>
                                </div>
                                <List
                                  grid={{
                                    gutter: 16
                                  }}
                                  //   this is where we're passing, mapping and filtering the list of 'cent' (in dataSource)
                                  dataSource={cent
                                    .filter(
                                      item =>
                                        item.country.toLowerCase() ===
                                          country.name.toLowerCase() &&
                                        item.name.toLowerCase().includes(search)
                                    )
                                    .filter(el => {
                                      return chef ? el.chief === "true" : el;
                                    })
                                    .sort((a, b) => {
                                      let comp = 0;
                                      if (
                                        a.name.toUpperCase() >
                                        b.name.toUpperCase()
                                      ) {
                                        comp = 1;
                                      } else if (
                                        a.name.toUpperCase() <
                                        b.name.toUpperCase()
                                      ) {
                                        comp = -1;
                                      }
                                      return comp;
                                    })
                                    .sort(item => {
                                      let comp = 0;
                                      if (item.chief === "true") {
                                        console.log(item.name);
                                        comp = -1;
                                      } else if (item.chief === "false") {
                                        comp = 1;
                                      }
                                      return comp;
                                    })}
                                  renderItem={item => (
                                    <List.Item
                                      className={
                                        item.chief === "true"
                                          ? "ant-col-xxl-22 ant-col-xl-22 country-card-full"
                                          : "ant-col-xxl-11 ant-col-xl-11 country-card-half"
                                      }
                                      style={{
                                        padding: "0 8px"
                                      }}
                                    >
                                      <MediaControlCard item={item} />
                                    </List.Item>
                                  )}
                                />
                              </section>
                            </List.Item>
                          )}
                        />
                      </Content>
                    )}
                  </Col>
                  <Col span={3} />
                </Row>
              </Layout>
            </Layout>
          </Layout>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cent: state.Cent.centList
});
const mapDispatchToProps = dispatch => ({
  getPersons: () => {
    dispatch(getPersons());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cent);
