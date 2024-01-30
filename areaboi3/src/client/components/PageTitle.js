import React from 'react';

const PageTitle = ({ title = '', icon = '' }) => {
  return (
    <div
      style={{
        display: 'flex',
        background: 'black',
        height: 50,
        color: 'white',
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <img src={icon} style={{ width: 25, height: 20, marginRight: 10 }} />
      <p
        style={{
          textAlign: 'center',
          fontSize: 24,
          textTransform: 'uppercase',
          marginTop: 27
        }}>
        {title}
      </p>
    </div>
  );
};

export default PageTitle;
