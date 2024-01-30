import React, { useState, useEffect } from 'react';
import GeneralEnterButton from '../../../GeneralEnterButton';
import GallerySvg from '../../../../assets/svgComponents/GallerySvg';
import UploadForm from '../../../UploadForm';
import { Form, Input } from 'antd';
import UploadDoneSvg from '../../../../assets/svgComponents/UploadDoneSvg';

function EventsForm1({ categories, setEventsForm1Values, setImageUrl }) {
  const [link, setLink] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const [remainingCategories, setRemainingCategories] = useState(categories);
  const [uploadFormActive, setUploadFormActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [inputActivated, setInputActivated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [galleryError, setGalleryError] = useState(false);
  const [galleryUploaded, setGalleryUploaded] = useState(false);
  const userName = 'Areaboi';

  const scrollToForm = () => {
    const section = document.getElementById('events-form');
    section.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  useEffect(() => {
    scrollToForm();
    const eventsPost = JSON.parse(localStorage.getItem('areaboxEvents'));
    setChosenCategory(eventsPost?.category ? eventsPost.category : category);
    setLink(eventsPost?.link ? eventsPost.link : link);
    setGallery(eventsPost?.gallery ? eventsPost.gallery : gallery);
  }, []);

  const modalUploadOpen = (activate) => setUploadFormActive(activate);
  const openModalUpload = () => modalUploadOpen(true);
  const uploadFormOpen = (activate) => setUploadFormActive(activate);
  const pickCategory = (category) => {
    setChosenCategory(category);
    setRemainingCategories(categories.filter((item) => item !== category));
  };
  const onButtonClicked = () => {
    if (!chosenCategory.length) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);
    if (!gallery.length) {
      setGalleryError(true);
      return;
    }
    setGalleryError(false);
    const formValues = {
      link: link,
      category: chosenCategory,
      gallery: gallery
    };
    setEventsForm1Values(formValues);
  };
  const deActivateInput = (e) => {
    console.log('disable inputActivated');

    setInputActivated(false);
    setEditing(false);
    setInitialMessage('');
  };
  const concatInput = (url) => {
    if (url) {
      setGallery([...gallery, url]);
      setGalleryUploaded(true);
      setGalleryError(false);
      setInitialMessage(initialMessage + '\n' + url);
      setUploadFormActive(false);
    } else {
      setGalleryUploaded(true);
      setGalleryError(true);
    }
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
        {categoryError && (
          <span className="sales-form-error-text">Category is required</span>
        )}
      </div>

      <div class="sales-form-add-gallery">
        <div class="sales-form-label">ADD PHOTO</div>
        <p>Add at least 1 photo for this item.</p>
        <p>
          First picture is the title picture. You can change the order of the
          photos, just grab your photos and drag
        </p>

        <div class="sales-form-gallery-div">
          <div className="input_btn_container">
            <button
              type="button"
              onClick={openModalUpload}
              className="inputs input_btn">
              <GallerySvg />
              <span>Gallery</span>
            </button>
          </div>

          {galleryUploaded && (
            <div class="sales-form-gallery-feedback">
              <div class="sales-form-gallery-feedback-icon">
                {galleryError && <UploadFailedSvg />}
                {!galleryError && <UploadDoneSvg />}
              </div>
              <span className={`${galleryError ? 'sales-feedback-error' : ''}`}>
                {galleryError ? 'Failed' : 'Done'}
              </span>
            </div>
          )}
        </div>

        <Form>
          <Form.Item
            rules={[
              {
                type: 'url'
              },
              { required: true }
            ]}
            style={{ marginBottom: '0' }}>
            <Input
              onChange={(e) => {
                setLink(e.target.value);
              }}
              value={link}
              type="text"
              placeholder="Add link to Youtube video"
            />
          </Form.Item>
        </Form>
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
              setImageUrl={setImageUrl}
              // sendInput={sendInput}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsForm1;
