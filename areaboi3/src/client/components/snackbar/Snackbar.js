import React, { useEffect } from 'react';
import styles from './Snackbar.module.css';

export default function Index({ message, duration, HideSnackbar }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      HideSnackbar();
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={styles.message}>
      <img src="/static/img/AreaBoxVector.png" alt="stuff" />
      <p>{message}</p>
         
    </div>
  );
}
