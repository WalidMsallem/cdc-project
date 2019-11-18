import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getProjects } from "../../actions/projectsAction";
import { Input } from "antd";
import "antd/dist/antd.css";
import { List, Icon, Checkbox } from "antd";
import { Layout, Menu, Col, Row } from "antd";
import OverflowText from "./showMore";
import Spinner from "./spinner";
import NavBar from "./NavBar";
import "./ProjectsList.css";

const { SubMenu } = Menu;
const { Sider } = Layout;
const Search = Input.Search;
const thematics = [
  "Culture Tourisme et Media",
  "Economie et compétitivité",
  "Environnement et développement durable",
  "Jeunesse, éducation et mobilité"
];
const countries = [
  "Algérie",
  "Espagne",
  "France",
  "Italie",
  "Libye",
  "Malte",
  "Maroc",
  "Mauritanie",
  "Portugal",
  "Tunisie"
];

const IconText = ({ type, text, size = "25px" }) => (
  <span>
    <span style={{ fontSize: "18px" }}> {text}</span>
    <Icon
      type={type}
      style={{ marginRight: 8, fontSize: size, color: "#08c" }}
    />
  </span>
);

class ProjectsList extends React.Component {
  state = {
    search: "",
    countryFilter: [],
    themeFilter: []
  };
  searchValue = e => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  componentDidMount() {
    this.props.getProjects();
  }
  data = x => {
    const projects = [];
    const inComeData = !x ? [] : x;
    for (let i = 0; i < inComeData.length; i++) {
      projects.push({
        title: <h2>{inComeData[i].title}</h2>,
        country: inComeData[i].country,
        organizer: inComeData[i].organizer,
        thematic: inComeData[i].thematic,
        document: inComeData[i].document,
        description: inComeData[i].description
      });
    }
    return projects;
  };

  onChangeCheck = checkedValues => {
    this.setState({
      countryFilter: checkedValues
    });
  };
  onChangeTheme = checkedValues => {
    this.setState({
      themeFilter: checkedValues
    });
  };

  render() {
    const { projects } = this.props;
    const { countryFilter, search, themeFilter } = this.state;

    return (
      <Fragment>
        <NavBar />
        <main>
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
                defaultSelectedKeys={["1"]}
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
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="setting" />
                      Thématique
                    </span>
                  }
                >
                  <Checkbox.Group
                    style={{ paddingLeft: "48px", width: "90%" }}
                    options={thematics}
                    onChange={this.onChangeTheme}
                  />
                </SubMenu>
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
                    options={countries}
                    onChange={this.onChangeCheck}
                  />
                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="page-layout">
              <Row>
                <Col span={21}>
                  {!projects.length > 0 ? (
                    <Spinner />
                  ) : (
                    <div className="projects-list">
                      <List
                        itemLayout="vertical"
                        size="large"
                        bordered
                        pagination={{
                          onChange: page => {
                            console.log(page);
                          },
                          pageSize: 10
                        }}
                        dataSource={projects
                          .sort((a, b) => {
                            let comp = 0;
                            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                              comp = 1;
                            } else if (
                              a.title.toUpperCase() < b.title.toUpperCase()
                            ) {
                              comp = -1;
                            }
                            return comp;
                          })
                          .filter(item =>
                            item.title.toLowerCase().includes(search)
                          )
                          .filter(el => {
                            return !themeFilter.length
                              ? el
                              : themeFilter
                                  .map(e => e.toLowerCase())
                                  .includes(
                                    el.thematic
                                      ? el.thematic.toLowerCase()
                                      : " "
                                  );
                          })
                          .filter(el => {
                            return !countryFilter.length
                              ? el
                              : countryFilter
                                  .map(e => e.toLowerCase())
                                  .includes(
                                    el.country ? el.country.toLowerCase() : " "
                                  );
                          })}
                        renderItem={item => (
                          <List.Item
                            bordered
                            key={item.title}
                            className="project-card"
                          >
                            <List.Item.Meta
                              title={
                                <div className="project-header">
                                  {item.title}
                                  {
                                    <p className="thematique-header">
                                      {item.thematic || ""}
                                    </p>
                                  }
                                </div>
                              }
                              description={
                                <div className="thematic">
                                  <span className="organization-name">
                                    {item.organizer || ""}
                                  </span>
                                  {item.organizer && item.country ? ", " : ""}
                                  {item.country
                                    ? item.country.toUpperCase()
                                    : ""}
                                </div>
                              }
                            />
                            {
                              <div className="description">
                                <OverflowText item={item.description} />
                              </div>
                            }
                            {item.document ? (
                              <a
                                href={`http://mediterraneedestalents.org/${
                                  item.document
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <IconText
                                  type="download"
                                  text="TELECHARGER LE DOCUMENT EN PDF"
                                  size="16px"
                                />
                              </a>
                            ) : null}
                          </List.Item>
                        )}
                      />
                    </div>
                  )}
                </Col>
                <Col span={3} />
              </Row>
            </Layout>
          </Layout>
        </main>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProjects: () => {
    dispatch(getProjects());
  }
});
const mapStateToProps = state => ({
  projects: state.project.projects
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsList);
