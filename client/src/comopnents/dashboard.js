import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import ProjectsTable from "./project-table";
import CentTable from "./cents-table";
import ContactAdmin from "./contactAdmin";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
class Dashboard extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div id="logo-admin">
            <img id="image-logo-admin" src="/logo.png" />
          </div>
          {/* theme="dark" */}
          <Menu
            theme="dark"
            defaultSelectedKeys={["0"]}
            mode="inline"
            className="add-style-menu"
          >
            <Menu.Item key="1">
              <Icon type="project" />
              <span>
                <Link to="/dashboard/projects-table" className="sider-link">
                  Liste des projects
                </Link>
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>
                <Link to="/dashboard/liste-cents" className="sider-link">
                  Liste des cents
                </Link>
              </span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="mail" />
              <span>
                <Link to="/dashboard/Contact-admin" className="sider-link">
                  Inbox
                </Link>
              </span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="logout" />
              <span onClick={this.props.logoutUser} className="Log-out">
                Log out
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, paddingLeft: 20 }}>
            CDC- Admin
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 360
              }}
            >
              <Route
                exact
                path="/dashboard/projects-table"
                render={() => <ProjectsTable />}
              />
              <Route
                exact
                path="/dashboard/liste-cents"
                render={() => <CentTable />}
              />
              <Route
                exact
                path="/dashboard/Contact-admin"
                render={() => <ContactAdmin />}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  null,
  { logoutUser }
)(Dashboard);
