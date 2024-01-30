import React, { Fragment, useState } from 'react';
import Link from 'next/link';

import { Layout, Menu, Input, Dropdown } from 'antd';

import styles from './header.module.scss';

const { Header } = Layout;
const { Search } = Input;

const header = () => {
  const onSearch = (value) => console.log(value);

  const menu = (
    <Menu>
      <Menu.Item key="a">
        <Link legacyBehavior href="/metro">
          <a>Metro</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="b">
        <Link legacyBehavior href="/metro">
          <a>School</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="c">
        <Link legacyBehavior href="/metro">
          <a>Cinema</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="d">
        <Link legacyBehavior href="/metro">
          <a>Radio</a>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Link href="/">
            <img
              className="mascot"
              src="../static/img/areabox_logo.svg"
              alt="Areaboi logo"
              style={{ cursor: 'pointer' }}
            />
          </Link>

          <Search
            className={styles.search}
            placeholder="Search here..."
            onSearch={onSearch}
            enterButton
            style={{ width: 340 }}
          />
          <Menu
            className={styles.menu}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Discover</Menu.Item>
            <Menu.Item key="3">Message</Menu.Item>
            <Menu.Item>
              {' '}
              <Dropdown overlay={menu}>
                <a>Channels</a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </div>
  );
};

export default header;
