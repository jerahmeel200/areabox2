import { Button, Pagination, Col, Row } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import styles from './Contents.module.scss';

const Contents = ({ filters = [], data = [] }) => {
  const Card = ({ children }) => {
    return <div className={styles.card}>{children}</div>;
  };
  const Image = ({ src }) => {
    return (
      <div className={styles.card_image}>
        <img className={styles.img} src={src} />
        <Fab />
      </div>
    );
  };

  const Fab = () => {
    return (
      <a
        className={[
          styles.btn_floating,
          styles.btn_large,
          styles.halfway_fab,
          styles.red
        ].join(' ')}>
        <CaretRightOutlined />
      </a>
    );
  };

  const Content = ({ title, description }) => {
    return (
      <div className={styles.card_content}>
        <Title text={title} />
        <Description text={description} />
      </div>
    );
  };

  const Title = ({ text }) => {
    return <span className={styles.card_title}>{text}</span>;
  };

  const Description = ({ text }) => {
    return <p className={styles.card_description}>{text}</p>;
  };

  return (
    <section className={styles.container}>
      <section className={styles.content}>
        <aside className={styles.filter}>
          {filters.map((filter) => (
            <Button className={styles.btn} size="large">
              {filter}
            </Button>
          ))}
        </aside>

        <div className={styles.details}>
          <div className={styles.card_list}>
            <Row gutter={[16, 24]}>
              {data.map((post) => (
                <Col span={6}>
                  <Card>
                    <Image src={post.image} />
                    <Content title={post.title} description={post.text} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>

      <Pagination className={styles.pagination} defaultCurrent={1} total={50} />
    </section>
  );
};

Contents.propTypes = {};

export default Contents;
