import React, { Component } from "react";
import "antd/dist/antd.css";
import ProjectsList from "./ProjectsList";
import Home from "./Home";
import Contact from "./Contact";
import Cent from "./Cent";
import Forum from "./Forum";
import tunis from "../img/tunis.png";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./navbar.css";

export default class NavBar extends React.Component {
  state = {
    current: "mail"
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <header className="nav-bar">
        <Link component={Home} to="/" className="nav-logo">
          <img src={tunis} alt="Logo" />
        </Link>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ backgroundColor: "transparent" }}
        >
          <Menu.Item key="cent">
            <Link component={Cent} to="/cent">
              Les Cent
            </Link>
          </Menu.Item>

          <Menu.Item key="forum">
            <Link component={Forum} to="/forums">
              Les Forums
            </Link>
          </Menu.Item>
          <Menu.Item key="projet">
            <Link component={ProjectsList} to="/projects">
              Les Projets
            </Link>
          </Menu.Item>

          <Menu.Item key="contact">
            <Link component={Contact} to="/contact">
              Contact
            </Link>
          </Menu.Item>
        </Menu>
      </header>
    );
  }
}
