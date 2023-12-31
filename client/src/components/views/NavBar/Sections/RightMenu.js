/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge, Icon, Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user);


  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <Link to='/product/upload'>
          {/* <Icon type="upload" style={{ fontSize: 30, marginBottom: 4 }} /> */} Upload
          </Link>
        </Menu.Item>

        <Menu.Item key="cart">
          <Badge count={1005}>
            <Link to="/user/cart" style={{ marginRight: -22, color: '#667777' }} >
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 4 }} />
            </Link>
          </Badge>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

