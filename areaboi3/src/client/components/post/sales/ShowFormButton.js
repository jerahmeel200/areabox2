import React from 'react';
import Image from 'next/image';
import Cart from '../../../assets/imgs/cart.png';
import P2P from '../../../assets/imgs/p2p-icon.png';
import Events from '../../../assets/imgs/events-icon.png';

function ShowFormButton({ activeForm, category, room_key }) {
  const getIcon = () => {
    if (room_key === 'p2p-exchange') {
      return P2P;
    } else if (room_key === 'events') {
      return Events;
    } else if (room_key === 'for-sale') {
      return Cart;
    }
  };
  const getText = () => {
    if (room_key === 'p2p-exchange') {
      return <p>List an Asset for Exchange</p>;
    } else if (room_key === 'events') {
      return <p>List Local / Virtual Event</p>;
    } else if (room_key === 'for-sale') {
      return (
        <p>List {activeForm === 'formScreen1' ? 'Item' : category} For Sale</p>
      );
    }
  };
  return (
    <div>
      <img src={getIcon()} alt="" />
      {getText()}
    </div>
  );
}

export default ShowFormButton;
