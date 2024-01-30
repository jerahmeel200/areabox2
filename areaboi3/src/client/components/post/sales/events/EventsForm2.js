import React, { useEffect, useState } from 'react';

import { DatePicker, Space, Form, Select, Input } from 'antd';

import GeneralEnterButton from '../../../GeneralEnterButton';
import CheckIn from '../../../../assets/imgs/in-check.png';
import NairaSvg from '../../../../assets/svgComponents/NairaSvg';
import DollarSvg from '../../../../assets/svgComponents/DollarSvg';
// import 'antd/dist/antd.css';

const { TextArea } = Input;

function EventsForm2({ setEventsForm2Values, makeEventsPost }) {
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [currency, setCurrency] = useState('naira');
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    setPrice(eventsPost.price);
    setLocation(eventsPost.location);
    setTitle(eventsPost.title);
    setAudience(eventsPost.audience);
    setDescription(eventsPost.description);
    setDate(eventsPost.date);
    setRecurring(eventsPost.recurring);
    setCurrency(eventsPost.currency);

    const eventsPost = JSON.parse(localStorage.getItem('areaboxEvents'));
    setPrice(eventsPost?.price ? eventsPost.price : price);
    setLocation(eventsPost?.location ? eventsPost.location : location);
    setTitle(eventsPost?.title ? eventsPost.title : title);
    setAudience(eventsPost?.audience ? eventsPost.audience : audience);
    setDescription(
      eventsPost?.description ? eventsPost.description : description
    );
    setDate(eventsPost?.date ? eventsPost.date : date);
    setRecurring(eventsPost?.recurring ? eventsPost.recurring : recurring);
    setCurrency(eventsPost?.currency ? eventsPost.currency : currency);
  }, []);

  const [form] = Form.useForm();

  const onDateChange = (date, dateString) => {
    console.log(dateString);
    setDate(date);
  };

  const onButtonClicked = () => {
    const formValues = {
      price,
      location,
      title,
      currency,
      audience,
      description,
      date,
      recurring
    };
    setEventsForm2Values(formValues);
    // makeEventsPost()
  };

  const audienceSelect = [
    { label: 'PRIVATE OR PUBLIC', value: '' },
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' }
  ];

  const selectStyle = {
    display: 'block',
    width: '100%',
    // height: "35px",
    textAlign: 'center',
    marginBottom: '10px',
    borderRadius: '0',
    fontSize: '10px'
  };

  const locationOptions = [
    { label: 'Ikeja', value: 'ikeja' },
    { label: 'Lekki', value: 'lekki' },
    { label: 'Ajah', value: 'ajah' }
  ];

  const scrollToForm = () => {
    const section = document.getElementById('events-form');
    section.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  useEffect(() => {
    scrollToForm();
  }, []);

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };
  const handleCurrency = (value) => {
    setCurrency(value);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    const newFormErrors = errorInfo.errorFields.map((error) => error.name[0]);
    setFormErrors(newFormErrors);
    console.log(newFormErrors);
  };

  const initialValues = {
    price,
    location,
    title,
    audience,
    description,
    date,
    recurring,
    currency
  };
  return (
    <div className="sales-form2" id="events-form">
      <div class="sales-form-gallery-display">
        <div class="sales-form-label">GALLERY</div>
        <div class="sales-form-gallery-carousel">
          {/* Display gallery images carousel here */}
          <p>DISPLAY USER IMAGE HERE.</p>
          <p>THUMBNAIL IN HORIZONTAL SCROLL</p>
        </div>
      </div>

      <Form
        form={form}
        onFinish={onButtonClicked}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}>
        <div class="price-location">
          <div class="price">
            <div class="sales-form-label">PRICE</div>
            <div class="price-currency">
              <NairaSvg
                onClick={() => handleCurrency('naira')}
                currency={currency}
              />
              <DollarSvg
                onClick={() => handleCurrency('dollar')}
                currency={currency}
              />
            </div>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Price is Required'
                }
              ]}>
              <Input
                className={`${
                  formErrors.includes('price') ? 'form-div-err' : ''
                }`}
                value={price}
                onChange={handlePriceChange}
                type="text"
                placeholder="0.000000"
              />
            </Form.Item>
          </div>
          <div class="location">
            <div class="sales-form-label">LOCATION</div>
            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Location is Required'
                }
              ]}>
              {/* <select onChange={(e)=>{setLocation(e.target.value)}}>
                <option value="ikeja">Ikeja</option>
                <option value="lekki">Lekki</option>
                <option value="ajah">Ajah</option>
              </select> */}
              <Select
                defaultValue={locationOptions[0].label}
                options={locationOptions}
                onChange={(value) => {
                  setLocation(value);
                }}
                style={selectStyle}
                className={`${
                  formErrors.includes('location') ? 'form-div-err' : ''
                }`}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Title is Required'
            }
          ]}>
          <div
            className={`title form-div ${
              formErrors.includes('title') ? 'form-div-err' : ''
            }`}>
            <div class="sales-form-label">TITLE</div>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              type="text"
              placeholder="Give your TALK a title"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="audience"
          rules={[
            {
              required: true,
              message: 'audience is required'
            }
          ]}>
          <div
            className={`condition form-div ${
              formErrors.includes('audience') ? 'form-div-err' : ''
            }`}>
            <div class="sales-form-label">AUDIENCE</div>
            {/* <select onChange={(e)=>{setAudience(e.target.value)}}>
              <option value="">PRIVATE OR PUBLIC?</option>
              <option value="private">PRIVATE</option>
              <option value="public">PUBLIC</option>
            </select> */}
            <Select
              defaultValue={audienceSelect[0].label}
              options={audienceSelect}
              onChange={(e) => {
                setAudience(value);
              }}
              style={selectStyle}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Description is required'
            }
          ]}>
          <div
            className={`description form-div ${
              formErrors.includes('description') ? 'form-div-err' : ''
            }`}>
            <div class="sales-form-label">DESCRIPTION</div>
            <TextArea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              name="description"
              id="description"
              placeholder="Write more about the event"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              message: 'date is required'
            }
          ]}>
          <div
            className={`shipping form-div ${
              formErrors.includes('date') ? 'form-div-err' : ''
            }`}>
            <div class="sales-form-label">DATE</div>
            {/* <select onChange={(e)=>{setDate(e.target.value)}}>
              <option value="">SCHEDULE W. DATE AND TIME PICKER</option>
              <option value="dhl">DHL</option>
              <option value="gokada">Gokada</option>
            </select> */}
            <DatePicker
              onChange={onDateChange}
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid rgba(0,0,0,0.25)',
                boxShadow: 'none',
                borderRadius: '0',
                color: '#000',
                fontFamily: 'Roboto Mono',
                fontSize: '10px',
                fontWeight: 400
              }}
              placeholder="SCHEDULE W. DATE & TIME PICKER"
            />
          </div>
        </Form.Item>
        <Form.Item name="recurring">
          <div class="negotiable">
            <div>
              <label htmlFor="negotiable">
                {recurring && <div class="negotiable-true"></div>}
              </label>
              <Input
                checked={recurring}
                value={recurring}
                onChange={(e) => {
                  setRecurring(e.target.checked);
                }}
                type="checkbox"
                id="negotiable"
              />
            </div>
            <p className="mb-0">Recurring event</p>
          </div>
        </Form.Item>
      </Form>

      <div class="mx-auto click-effect">
        <GeneralEnterButton text={'Enter'} />
      </div>
    </div>
  );
}

export default EventsForm2;
