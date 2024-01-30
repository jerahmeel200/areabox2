import React, { useCallback, useEffect, useState } from 'react';
import SalesForms from '../../post/sales/forsale/SalesForms';
import EventsForm from '../../post/sales/events/EventsForm';
import P2PForm from '../../post/sales/p2p/P2PForm';
import Post from '../../post/sales/Post';

import ShowFormButton from '../../post/sales/ShowFormButton';
import ItemPreviewCard from '../../post/sales/ItemCardPreview';
import { get, push, ref, ref as refD, set, update } from 'firebase/database';
import FirebaseDatabase, { auth } from '../../../settings/firebase';

function Posts({
  posts,
  page,
  commentFn,
  userLogedIn,
  registered,
  nocache,
  editFn,
  userMetadata,
  profileFn,
  gChatRef,
  readonly,
  pinFn,
  layout,
  loadMore,
  showPassport,
  showWallets,
  getSaleInformation
}) {
  useEffect(() => {
    const uniqueSellers = [];

    for (const post of posts) {
      const user = post.user;
      if (!uniqueSellers.includes(user)) {
        uniqueSellers.push(user);
      }
    }

    const getSellerProfiles = async () => {
      const profilePromises = uniqueSellers.map(async (user) => {
        const sellerRef = ref(FirebaseDatabase, `users/${user}`);
        const snapshot = await get(sellerRef);
        const sellerProfile = snapshot.val();
        return { user, sellerProfile };
      });

      try {
        const sellerProfiles = await Promise.all(profilePromises);
        const updatedPosts = posts.map((post) => {
          const user = post.user;
          const sellerProfile = sellerProfiles.find(
            (profile) => profile.user === user
          );
          return {
            ...post,
            user: sellerProfile ? sellerProfile.sellerProfile : user
          };
        });

        setPostsWithSellerProfile(updatedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    getSellerProfiles();
  }, [posts]);
  const salesPostInitialValue = {
    category: '',
    link: '',
    gallery: [],
    price: '',
    location: '',
    title: '',
    brand: '',
    condition: '',
    description: '',
    shipping: '',
    negotiable: false,
    currency: 'naira'
  };

  const [showSalesForm, setShowSalesForm] = useState(false);
  const [postClicked, setPostClicked] = useState(false);
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');
  const [gallery, setGallery] = useState([]);
  const [activeForm, setActiveForm] = useState('formScreen1');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [shipping, setShipping] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [currency, setCurrency] = useState('naira');
  const [salesPost, setSalesPost] = useState(salesPostInitialValue);
  const [loading, setLoading] = useState(false);
  const [postsWithSellerProfile, setPostsWithSellerProfile] = useState([]);
  // Events
  const eventsPostInitialValue = {
    category: '',
    link: '',
    gallery: [],
    price: '',
    location: '',
    title: '',
    audience: '',
    description: '',
    date: '',
    recurring: false,
    currency: 'naira'
  };
  const [showEventsForm, setShowEventsForm] = useState(false);
  const [eventsCategory, setEventsCategory] = useState('');
  const [eventsLink, setEventsLink] = useState('');
  const [eventsGallery, setEventsGallery] = useState([]);
  const [eventsActiveForm, setEventsActiveForm] = useState('eventsFormScreen1');
  const [eventsPrice, setEventsPrice] = useState(0);
  const [eventsCurrency, setEventsCurrency] = useState('naira');
  const [eventsLocation, setEventsLocation] = useState('');
  const [eventsTitle, setEventsTitle] = useState('');
  const [eventsAudience, setEventsAudience] = useState('');
  const [eventsDescription, setEventsDescription] = useState('');
  const [eventsDate, setEventsDate] = useState('');
  const [eventsRecurring, setEventsRecurring] = useState(false);
  const [eventsPost, setEventsPost] = useState(eventsPostInitialValue);

  // P2P
  const [p2pCategory, setP2pCategory] = useState('');
  const [p2pLink, setP2pLink] = useState('');
  const [p2pAsset, setP2pAsset] = useState([]);
  const [showP2pForm, setShowP2pForm] = useState(false);
  const [p2pActiveForm, setP2pActiveForm] = useState('p2pFormScreen1');
  const [p2pPost, setP2pPost] = useState({});

  const setSalesForm1Values = (formValues) => {
    console.log(formValues);
    console.log(formValues.gallery);
    setCategory(formValues.category);
    setGallery(formValues.gallery);
    setLink(formValues.link);
    setSalesPost({
      ...salesPost,
      category: formValues.category,
      link: formValues.link,
      gallery: formValues.gallery
    });
    setActiveForm('formScreen2');
  };

  const setSalesForm2Values = (formValues) => {
    setPrice(formValues.price);
    setLocation(formValues.location);
    setTitle(formValues.title);
    setBrand(formValues.brand);
    setCondition(formValues.condition);
    setDescription(formValues.description);
    setShipping(formValues.shipping);
    setNegotiable(formValues.negotiable);
    setCurrency(formValues.currency);
    setSalesPost({
      ...salesPost,
      price: formValues.price,
      location: formValues.location,
      title: formValues.title,
      brand: formValues.brand,
      condition: formValues.condition,
      description: formValues.description,
      shipping: formValues.shipping,
      negotiable: formValues.negotiable,
      currency: formValues.currency,
      user: auth.currentUser
    });
    localStorage.removeItem('areaboxForsale');
    setActiveForm('formScreen3');
  };

  // Events
  const setEventsForm1Values = (formValues) => {
    setEventsCategory(formValues.category);
    setEventsGallery(formValues.gallery);
    setEventsLink(formValues.link);
    setEventsPost({
      ...eventsPost,
      category: formValues.category,
      gallery: formValues.gallery,
      link: formValues.link
    });
    setEventsActiveForm('eventsFormScreen2');
  };

  const setEventsForm2Values = (formValues) => {
    setEventsPrice(formValues.price);
    setEventsCurrency(formValues.currency);
    setEventsLocation(formValues.location);
    setEventsTitle(formValues.title);
    setEventsAudience(formValues.audience);
    setEventsDescription(formValues.description);
    setEventsDate(formValues.date);
    setEventsRecurring(formValues.recurring);
    setEventsPost({
      ...eventsPost,
      price: eventsPrice,
      currency: eventsCurrency,
      location: eventsLocation,
      title: eventsTitle,
      audience: eventsAudience,
      description: eventsDescription,
      date: eventsDate,
      recurring: eventsRecurring,
      user: auth.currentUser
    });
    localStorage.removeItem('areaboxEvents');
    setEventsActiveForm('eventsformScreen3');
    // makeEventsPost(formValues);
  };

  const handleShowSalesForm = () => {
    setShowSalesForm(!showSalesForm);
  };
  const handleShowP2pForm = () => {
    setShowP2pForm(!showP2pForm);

    console.log(page.room_key);
    console.log(showP2pForm);
  };
  const handleShowEventsForm = () => {
    setShowEventsForm(!showEventsForm);
  };

  const handlePostClicked = (post, type) => {
    if (type === 'for-sale') {
      setSalesPost(post);
    }
    if (type === 'events') {
      setEventsPost(post);
    }
    if (type === 'p2p') {
      setP2pPost(post);
    }
    setPostClicked(true);
  };
  // console.log(auth.currentUser);

  const makePost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return; // Exit function if user is not authenticated
    }
    const userDisplayName = user.displayName;
    const newPost = {
      user: userDisplayName,
      title,
      price,
      currency,
      link,
      location,
      brand: '#' + brand,
      condition: '#' + condition,
      category: '#' + category,
      description,
      shipping,
      negotiable,
      gallery
    };
    // console.log(auth.currentUser)
    // console.log(userDisplayName)

    const forSaleRef = refD(gChatRef, 'chat/for-sale');
    // const forSaleRef = child(ref, userDisplayName)

    if (salesPost && salesPost.id) {
      const newPostRef = refD(gChatRef, `chat/for-sale/${salesPost.id}`);
      update(newPostRef, salesPost)
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const newKey = push(forSaleRef);
      set(newKey, newPost)
        .then(() => {
          return update(newKey, { '.priority': new Date().getTime() });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // Put code to post newPost here

    console.log(newPost);
    setLoading(false);
    setPrice('');
    setLocation('');
    setTitle('');
    setCategory('');
    setBrand('');
    setCondition('');
    setGallery([]);
    setDescription('');
    setShipping('');
    setNegotiable('');
    localStorage.removeItem('areaboxForsale');
    setActiveForm('formScreen1');
    setShowSalesForm(false);
  };

  // Events
  const makeEventsPost = async (formValues) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return; // Exit function if user is not authenticated
    }
    const {
      title,
      price,
      audience,
      location,
      link,
      currency,
      category,
      description,
      recurring,
      date
    } = formValues;
    const userDisplayName = user.displayName;
    const newEventPost = {
      user: userDisplayName,
      title,
      price,
      audience,
      location,
      link: eventsLink,
      category: '#' + eventsCategory,
      description,
      recurring,
      date,
      currency,
      gallery: eventsGallery
    };
    const eventRef = refD(gChatRef, 'chat/events');

    if (eventsPost && eventsPost.id) {
      const newPostRef = refD(gChatRef, `chat/events/${eventsPost.id}`);
      update(newPostRef, eventsPost)
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const newKey = push(eventRef);
      set(newKey, newEventPost)
        .then(() => {
          return update(newKey, { '.priority': new Date().getTime() });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    console.log(newEventPost);
    setLoading(false);
    setEventsPrice('');
    setEventsLocation('');
    setEventsTitle('');
    setEventsCategory('');
    setEventsAudience('');
    setEventsGallery([]);
    setEventsDescription('');
    setEventsLink('');
    setEventsRecurring('');
    setEventsDate('');
    localStorage.removeItem('areaboxEvents');
    setEventsActiveForm('eventsFormScreen1');
    setShowEventsForm(false);
  };

  // P2P
  const setP2pForm1Values = (formValues) => {
    setP2pCategory(formValues.category);
    setP2pAsset(formValues.asset);
    setP2pLink(formValues.link);
    // setP2pActiveForm("p2pFormScreen1");
    makeP2pPost(formValues);
  };
  const makeP2pPost = async (formValues) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return; // Exit function if user is not authenticated
    }
    const userDisplayName = auth.currentUser.displayName;
    const { category, link, asset } = formValues;
    const newP2pPost = {
      user: userDisplayName,
      category: '#' + category,
      asset: asset,
      link: link
      // category: p2pCategory,
      // asset: p2pAsset,
      // link: p2pLink
    };
    const p2pRef = refD(gChatRef, 'chat/p2p-exchange');
    if (p2pPost && p2pPost.id) {
      const newPostRef = refD(gChatRef, `chat/p2p-exchange/${p2pPost.id}`);
      update(newPostRef, p2pPost)
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const newKey = push(p2pRef);
      set(newKey, newP2pPost)
        .then(() => {
          return update(newKey, { '.priority': new Date().getTime() });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(newP2pPost);
    }

    setLoading(false);
    setP2pCategory('');
    setP2pLink('');
    setP2pAsset([]);
    setShowP2pForm(false);
  };

  const setImageUrl = (url) => {
    if (page.room_key === 'for-sale') {
      setGallery([...gallery, url]);
    } else if (page.room_key === 'events') {
      setEventsGallery([...eventsGallery, url]);
    } else if (page.room_key === 'p2p-exchange') {
      setP2pAsset([...p2pAsset, url]);
    }
  };

  const handleEditSalesForm = () => {
    setActiveForm('formScreen1');
  };
  const handleEditEventsForm = () => {
    setActiveForm('eventsFormScreen1');
  };

  return (
    <>
      {postClicked && (
        <ItemPreviewCard
          salesPost={salesPost}
          eventsPost={eventsPost}
          p2pPost={p2pPost}
          postClicked={postClicked}
          page={page}
          showWallets={showWallets}
          showPassport={showPassport}
          gallery={gallery}
          eventsGallery={eventsGallery}
          p2pAsset={p2pAsset}
          getSaleInformation={getSaleInformation}
        />
      )}
      {!postClicked && (
        <div style={{ marginTop: '20px' }}>
          {!showSalesForm && !showEventsForm && !showP2pForm && (
            <div class="sales-card-container">
              {posts.map((post, index) => (
                // getSalesCard(post, index)
                <Post
                  key={index}
                  page={page}
                  post={post}
                  index={index}
                  handlePostClicked={handlePostClicked}
                  userLogedIn={userLogedIn}
                />
              ))}
            </div>
          )}

          {page?.room_key === 'for-sale' && (
            <div
              onClick={handleShowSalesForm}
              id="post-list-item"
              className="post-list-item">
              <ShowFormButton
                activeForm={activeForm}
                category={category}
                room_key={page.room_key}
              />
            </div>
          )}
          {page?.room_key === 'p2p-exchange' && (
            <div
              onClick={handleShowP2pForm}
              id="post-list-item"
              className="post-list-item">
              <ShowFormButton
                activeForm={p2pActiveForm}
                category={category}
                room_key={page.room_key}
              />
            </div>
          )}
          {page?.room_key === 'events' && (
            <div
              onClick={handleShowEventsForm}
              id="post-list-item"
              className="post-list-item">
              <ShowFormButton
                activeForm={eventsActiveForm}
                category={category}
                room_key={page.room_key}
              />
            </div>
          )}

          {page?.room_key === 'for-sale' && showSalesForm && (
            <SalesForms
              page={page}
              activeForm={activeForm}
              handleEditSalesForm={handleEditSalesForm}
              salesPost={salesPost}
              setSalesForm1Values={setSalesForm1Values}
              setSalesForm2Values={setSalesForm2Values}
              makePost={makePost}
              setImageUrl={setImageUrl}
              gallery={gallery}
              getSaleInformation={getSaleInformation}
            />
          )}
          {page?.room_key === 'events' && showEventsForm && (
            <EventsForm
              page={page}
              activeForm={eventsActiveForm}
              handleEditEventsForm={handleEditEventsForm}
              eventsPost={eventsPost}
              eventsActiveForm={eventsActiveForm}
              setEventsForm1Values={setEventsForm1Values}
              setEventsForm2Values={setEventsForm2Values}
              setImageUrl={setImageUrl}
              gallery={eventsGallery}
              makeEventsPost={makeEventsPost}
            />
          )}
          {page?.room_key === 'p2p-exchange' && showP2pForm && (
            <P2PForm
              page={page}
              P2PActiveForm={p2pActiveForm}
              setP2pForm1Values={setP2pForm1Values}
              setImageUrl={setImageUrl}
              p2pAsset={p2pAsset}
              // makeP2PPost={makeP2pPost}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Posts;
