import { Layout, Input, Button, Tooltip } from 'antd';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

import styles from './footer.module.scss';

const { Footer } = Layout;

const footer = () => {
  return (
    <Footer className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.first_layout}>
          <div className={styles.info}>
            <Link href="/">
              <img
                className="mascot"
                src="../static/img/areaboi_logo_white.svg"
                alt="Areaboi logo"
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <p className={styles.phone}>+234 701 001 1012</p>
            <p className={styles.email}>support@areabox.com</p>
          </div>
          <div className={styles.links}>
            <h4 style={{ color: 'white' }}>Quick Links</h4>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 30,
                width: 300
              }}>
              <Link legacyBehavior href="/channels">
                <a href="#">My Channels</a>
              </Link>
              <Link legacyBehavior href="/metro">
                <a href="#">Metro</a>
              </Link>
              <Link legacyBehavior href="/trending">
                <a href="#">Trending</a>
              </Link>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 30,
                width: 280
              }}>
              <Link legacyBehavior href="/school">
                <a href="#">School</a>
              </Link>
              <Link legacyBehavior href="/radio">
                <a href="#">Radio</a>
              </Link>
              <Link legacyBehavior href="">
                <a href=""></a>
              </Link>
            </div>
            <div></div>
          </div>
          <div className="subscribe">
            <h4 style={{ color: 'white' }}>Subscribe</h4>
            <Input.Group compact style={{ width: 300, marginTop: 30 }}>
              <Input
                placeholder="Get Product updates"
                style={{ width: '70%' }}
              />
              <Tooltip title="subscribe" style={{ width: '30%' }}>
                <Button ghost icon={<ArrowRightOutlined />} />
              </Tooltip>
            </Input.Group>
          </div>
        </div>
        <hr style={{ marginTop: 65, marginBottom: 35 }} />
        <div className={styles.second_layout}>
          <div className={styles.social}>
            <a
              className={styles.social_button}
              href="https://www.facebook.com/"
              target="new">
              <i
                className="fab fa-facebook-f fa-2x"
                style={{ color: 'white' }}></i>
            </a>
            <a
              className={styles.social_button}
              href="https://www.linkedin.com/"
              target="new">
              <i
                className="fab fa-linkedin-in fa-2x"
                style={{ color: 'white' }}></i>
            </a>
            <a
              className={styles.social_button}
              href="https://twitter.com/"
              target="new">
              <i
                className="fab fa-twitter fa-2x"
                style={{ color: 'white' }}></i>
            </a>
          </div>
          <p>
            A product of{' '}
            <img
              className="mascot"
              src="../static/img/areaboi_logo_white.svg"
              alt="Areaboi logo"
              style={{
                cursor: 'pointer',
                width: 80,
                height: 40,
                marginTop: '-8px'
              }}
            />{' '}
          </p>
          <p>&copy; 2021 Areabox. All rights reserved</p>
        </div>
      </div>
    </Footer>
  );
};

export default footer;
