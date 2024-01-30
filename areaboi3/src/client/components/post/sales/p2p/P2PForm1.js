import React, { useState, useEffect } from 'react';
import GeneralEnterButton from '../../../GeneralEnterButton';
import GallerySvg from '../../../../assets/svgComponents/GallerySvg';
import UploadForm from '../../../UploadForm';

function P2PForm1({ categories, setP2pForm1Values, makeP2PPost }) {
  const [link, setLink] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const [remainingCategories, setRemainingCategories] = useState(categories);
  const [uploadFormActive, setUploadFormActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [asset, setAsset] = useState([]);
  const [inputActivated, setInputActivated] = useState(false);
  const [editing, setEditing] = useState(false);
  const userName = 'Areaboi';

  const scrollToForm = () => {
    const section = document.getElementById('events-form');
    section.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  useEffect(() => {
    scrollToForm();
  }, []);

  const modalUploadOpen = (activate) => setUploadFormActive(activate);
  const openModalUpload = () => modalUploadOpen(true);
  const uploadFormOpen = (activate) => setUploadFormActive(activate);
  const pickCategory = (category) => {
    setChosenCategory(category);
    setRemainingCategories(categories.filter((item) => item !== category));
  };
  const onButtonClicked = () => {
    const formValues = {
      category: chosenCategory,
      link: link,
      asset: asset
    };
    setP2pForm1Values(formValues);
    // makeP2PPost()
  };
  const deActivateInput = (e) => {
    console.log('disable inputActivated');

    setInputActivated(false);
    setEditing(false);
    setInitialMessage('');
  };
  const concatInput = (url) => {
    setGallery([...gallery, url]);
    setGalleryError(false);
    setInitialMessage(initialMessage + '\n' + url);
    setUploadFormActive(false);
  };
  // const sendInput = (event) => {
  //   console.log("sendInput");
  //   let message = this.input.value;
  //   console.log("sendInput " + message);
  //   if (message != "") {
  //     this.setState({ inputMessage: message });
  //   }
  //   deActivateInput(event);
  // };
  return (
    <div className="sales-form1" id="events-form">
      <div class="sales-form-category">
        <div class="sales-form-label">CATEGORY</div>
        <div class="sales-form-category-content">
          <div className="sales-form-category-left">{chosenCategory}</div>
          <div className="sales-form-category-right">
            {/* {remainingCategories.map((category, index)=>( */}
            {categories.map((category, index) => (
              <div
                onClick={() => {
                  pickCategory(category);
                }}
                key={index}
                className="sales-form-tags">
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="sales-form-add-gallery">
        <div class="sales-form-label">ADD ASSET</div>
        <p>
          Please upload asset into ESCROW for hold until transaction is
          complete.
        </p>

        <div class="sales-form-gallery-div">
          <div className="input_btn_container">
            <button
              type="button"
              onClick={openModalUpload}
              className="inputs input_btn">
              <GallerySvg />
              <span>ESCROW</span>
            </button>
          </div>
        </div>

        <input
          onChange={(e) => {
            setLink(e.target.value);
          }}
          value={link}
          type="text"
          placeholder="Add link to Youtube video"
        />
      </div>
      <div class="mx-auto click-effect">
        <GeneralEnterButton text={'Enter'} onButtonClick={onButtonClicked} />
      </div>

      <div id="input_plus">
        <div>
          {uploadFormActive && (
            <UploadForm
              uploadFormActive={uploadFormOpen}
              modalUploadOpen={modalUploadOpen}
              user={userName}
              concatInput={concatInput}
              // sendInput={sendInput}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default P2PForm1;
