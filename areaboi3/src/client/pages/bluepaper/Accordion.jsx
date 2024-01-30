import React, { useState } from 'react';
import styles from './blue.module.css';
const Accordion = ({ title, content, id, setIsActive, isActive }) => {
  const show = isActive === id;
  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionTitle}
        onClick={() => setIsActive(show ? null : id)}>
        <div
          className={styles.listContainer}
          style={{ backgroundColor: show ? 'rgba(255, 255, 255, 0.2)' : null }}>
          <li>{title}</li>
        </div>
      </div>
      {show && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;
