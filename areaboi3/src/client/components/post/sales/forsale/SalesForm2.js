import React, { useEffect, useState } from 'react';
import GeneralEnterButton from '../../../GeneralEnterButton';
import CheckIn from '../../../../assets/imgs/in-check.png';
import NairaSvg from '../../../../assets/svgComponents/NairaSvg';
import DollarSvg from '../../../../assets/svgComponents/DollarSvg';
import { Form, Input, Select } from 'antd';
import { isEmpty, isEmail } from '../../../../lib/formValidations';
import 'antd/dist/antd.css';

const { TextArea } = Input;

// Define options for select inputs
const locationOptions = [
  { label: 'Ikeja', value: 'Ikeja' },
  { label: 'Lekki', value: 'Lekki' },
  { label: 'Ajah', value: 'Ajah' }
];

const conditionSelect = [
  { label: 'Is the item brand new or used?', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Used', value: 'used' }
];

const shippingOptions = [
  { label: 'Drop down for courier options', value: '' },
  { label: 'DHL', value: 'DHL' },
  { label: 'Gokada', value: 'gokada' }
];

function SalesForm2({ setSalesForm2Values, gallery }) {
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(locationOptions[0].value);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [shipping, setShipping] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [currency, setCurrency] = useState('naira');
  const [formErrors, setFormErrors] = useState([]);
  // const salesPost = {}
  // useEffect(()=>{
  //   setPrice(salesPost.price ? salesPost.price : prie)
  //   setLocation(salesPost.location ? salesPost.location : location)
  //   setTitle(salesPost.title ? salesPost.title : title)
  //   setBrand(salesPost.brand ? salesPost.brand : brand )
  //   setCondition(salesPost.condition ? salesPost.condition : condition)
  //   setDescription(salesPost.description ? salesPost.description : description)
  //   setShipping(salesPost.shipping ? salesPost.shipping : shipping)
  //   setNegotiable(salesPost.negotiable ? salesPost.negotiable : negotiable)
  //   setCurrency(salesPost.currency ? salesPost.currency : currency)
  // },[])

  const [form] = Form.useForm();

  // useEffect(() => {
  //   // Set initial form values from salesPost
  //   form.setFieldsValue(salesPost);
  // }, [salesPost, form]);

  // console.log(location)

  // Style for select inputs
  const selectStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    marginBottom: '10px', //formErrors.some(r=> ["location", "condition", "shipping"].includes(r)) ? '0' : "10px",
    borderRadius: '0',
    fontSize: '10px'
  };

  const onButtonClicked = () => {
    const formValues = {
      price,
      location,
      title,
      brand,
      condition,
      description,
      shipping,
      negotiable,
      currency
    };
    setSalesForm2Values(formValues);
  };
  const scrollToForm = () => {
    const section = document.getElementById('sales-form');
    section.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  useEffect(() => {
    scrollToForm();
    const salesPost = JSON.parse(localStorage.getItem('areaboxForsale'));
    setPrice(salesPost?.price ? salesPost.price : price);
    setLocation(salesPost?.location ? salesPost.location : location);
    setTitle(salesPost?.title ? salesPost.title : title);
    setBrand(salesPost?.brand ? salesPost.brand : brand);
    setCondition(salesPost?.condition ? salesPost.condition : condition);
    setDescription(
      salesPost?.description ? salesPost.description : description
    );
    setShipping(salesPost?.shipping ? salesPost.shipping : shipping);
    setCurrency(salesPost?.currency ? salesPost.currency : currency);
    setNegotiable(salesPost?.negotiable ? salesPost.negotiable : negotiable);
  }, []);

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (/^\d*\.?\d*$/.test(value) && value.length <= 13) {
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
    brand,
    condition,
    description,
    shipping,
    negotiable,
    currency
  };

  return (
    <div className="sales-form2" id="sales-form">
      <div className="sales-form-gallery-display">
        <div className="sales-form-label">GALLERY</div>
        <div className="sales-form-gallery-carousel">
          {gallery[0] ? (
            <img src={gallery[0]} />
          ) : (
            <div>
              <p>DISPLAY USER IMAGES HERE</p>
              <p>
                THUMBNAILS IN HORIZONTAL <br /> SCROLL
              </p>
            </div>
          )}
          {/* display image here */}
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
              <Select
                // defaultValue={location}
                // value={location}
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
            <div className="sales-form-label">TITLE</div>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              value={title}
              placeholder="Give your post a title"
            />
          </div>
        </Form.Item>

        <Form.Item
          name="brand"
          rules={[
            {
              required: true,
              message: 'Brand is required'
            }
          ]}>
          <div
            className={`brand form-div ${
              formErrors.includes('brand') ? 'form-div-err' : ''
            }`}>
            <div class="sales-form-label">BRAND</div>
            <Input
              value={brand}
              type="text"
              placeholder="What's the product brand-name?"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
        </Form.Item>

        <div
          className={`condition form-div ${
            formErrors.includes('condition') ? 'form-div-err' : ''
          }`}>
          <div class="sales-form-label">CONDITION</div>

          <Form.Item
            name="condition"
            rules={[
              {
                required: true,
                message: 'Condition is required'
              }
            ]}>
            <Select
              defaultValue={conditionSelect[0].label}
              options={conditionSelect}
              style={selectStyle}
              onChange={(value) => {
                setCondition(value);
              }}
            />
          </Form.Item>
        </div>

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
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              name="description"
              id="description"
              placeholder="Write more about the item"
            />
          </div>
        </Form.Item>

        <div
          className={`shipping form-div ${
            formErrors.includes('shipping') ? 'form-div-err' : ''
          }`}>
          <div class="sales-form-label">SHIPPING</div>

          <Form.Item
            name="shipping"
            rules={[
              {
                required: true,
                message: 'Shipping is required'
              }
            ]}>
            <Select
              defaultValue={shippingOptions[0].label}
              options={shippingOptions}
              style={selectStyle}
              onChange={(value) => {
                setShipping(value);
              }}
            />
          </Form.Item>
        </div>

        <Form.Item name="negotiable">
          <div class="negotiable">
            <div>
              <label htmlFor="negotiable">
                {negotiable && <div class="negotiable-true"></div>}
              </label>
              <Input
                checked={negotiable}
                value={negotiable}
                onChange={(e) => {
                  setNegotiable(e.target.checked);
                }}
                type="checkbox"
                id="negotiable"
              />
            </div>
            <p>Price Negotiable</p>
          </div>
        </Form.Item>

        <Form.Item>
          <div className="mx-auto click-effect">
            <GeneralEnterButton text={'Enter'} />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SalesForm2;
