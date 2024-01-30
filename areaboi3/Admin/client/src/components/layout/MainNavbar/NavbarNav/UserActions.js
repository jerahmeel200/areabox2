import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';

import { auth } from '../../../../firebase';
import { AuthContext } from '../../../../context/Context';
import Modal from '../../../common/Modal';

export default () => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { setLoggedIn, setUser, user } = useContext(AuthContext);

  const toggleUserActions = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    // setModalOpen(true)
    localStorage.setItem('auth', null);
    auth
      .signOut()
      .then(function () {
        setLoggedIn(false);
        setUser();
      })
      .catch(function (error) {});
  };

  return modalOpen ? (
    <Modal
      modalOpen={modalOpen}
      modalTitle="Logout"
      children="Are you sure you want to log out?"
      affirmText="Logout"
      action={handleLogout}
      closeModal={() => {
        setModalOpen(false);
      }}
    />
  ) : (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar square mr-2"
          src={require('./../../../../images/avatars/areaboi.png')}
          alt="User Avatar"
        />{' '}
        <span className="d-none d-md-inline-block">{user.userName}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to="user-profile">
          <i className="material-icons">&#xE7FD;</i> Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="edit-user-profile">
          <i className="material-icons">&#xE8B8;</i> Edit Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="file-manager-list">
          <i className="material-icons">&#xE2C7;</i> Files
        </DropdownItem>
        <DropdownItem tag={Link} to="transaction-history">
          <i className="material-icons">&#xE896;</i> Transactions
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          onClick={() => setModalOpen(true)}
          className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};
