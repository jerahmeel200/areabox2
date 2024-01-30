import React, { Fragment } from 'react';

function ToggleButton({ isChecked, handleToggle }) {
  return (
    <Fragment>
      <label className="switch" htmlFor={'toggle-switch'}>
        <input
          id={'toggle-switch'}
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
    </Fragment>
  );
}

export default ToggleButton;
