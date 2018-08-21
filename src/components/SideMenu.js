import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class SideMenu extends Component {

  render() {
    return (
      <Menu theme="dark" mode="inline" style={{marginTop: '60px'}}>
        <Menu.Item key="1">
          <Link to='/'>
            <Icon type="user" />
            <span className="nav-text">Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to='/repo'>
            <Icon type="book" />
            <span className="nav-text">All Repositories</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu;
