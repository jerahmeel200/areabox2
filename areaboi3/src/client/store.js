// store.js

import { createStore } from 'redux'; //, applyMiddleware

export const publicRoomKey = 'public-room';
export const publicRoomTitle = 'Development';

export const NUM_MSGS = 5;

export const default_state = {
  loading: true,
  default_room: { key: publicRoomKey, title: publicRoomTitle, isPublic: true },
  page: {
    n: 0,
    LastMsgKey: 0,
    room_key: publicRoomKey,
    room_title: publicRoomTitle,
    gLatestPrio: 0
  },
  defaultUserName: 'Anonymous',
  registered: false,
  searchWords: false,
  tag: false
};
export const reload_state = default_state;

// REDUCERS and their Actions

export const ACTION_NEXT_PAGE = 'NEXT_PAGE';
export const ACTION_SET_ROOMS_LIST = 'ROOMS_LIST';
export const ACTION_SET_USER = 'SET_USER';
export const ACTION_UPDATE_PAGE = 'CHANGE_ROOM';

export const reducer = (state = default_state, action) => {
  // initial state must not be undefined

  switch (action.type) {
    case ACTION_NEXT_PAGE:
      return Object.assign({}, state, action.payload);
    case ACTION_SET_ROOMS_LIST: {
      console.log('store gRoomsList', action.payload);
      return Object.assign({}, state, action.payload);
    }
    case ACTION_SET_USER: {
      return Object.assign({}, state, action.payload);
    }
    case ACTION_UPDATE_PAGE: {
      return Object.assign({}, state, {
        page: Object.assign({}, state.page, action.page)
      });
    }
    default:
      return state;
  }
};

export const rootReducer = reducer;

// INIT STORE(s) for server and for client

export const initStore = (reducer, initialState) => {
  //=default_state
  //console.log( "initStore")
  return createStore(reducer, initialState); // applyMiddleware(thunkMiddleware, loggerMiddleware)
};

export const makeStore = (initialState, options) => {
  return initStore(reducer, initialState); // options.isServer
};
