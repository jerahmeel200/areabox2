import React from 'react';
import { Button } from 'antd';
import BlueArrowSvg from '../assets/svgComponents/BlueArrowSvg';
function GeneralEnterButton({
  text,
  onButtonClick = () => {},
  type = 'submit'
}) {
  const onButtonClicked = () => {
    onButtonClick();
  };
  return (
    <Button
      onClick={onButtonClicked}
      className="general-enter-button"
      htmlType={type}>
      <BlueArrowSvg />
      {text}
    </Button>
  );
}

export default GeneralEnterButton;
