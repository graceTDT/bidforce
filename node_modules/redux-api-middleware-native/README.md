Redux api middleware native
====================
[![Build Status](https://travis-ci.org/celso-henrique/redux-api-middleware-native.svg?branch=master)](https://travis-ci.org/celso-henrique/redux-api-middleware-native)
[![npm version](https://badge.fury.io/js/redux-api-middleware-native.svg)](https://badge.fury.io/js/redux-api-middleware-native)
[![npm](https://img.shields.io/npm/dt/redux-api-middleware-native.svg)]()

Api middleware for redux compatible with native and web apps.


# Install
```
npm install --save redux-api-middleware-native
```


# Adding the middleware to redux store
```js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import apiMiddleware from 'redux-api-middleware-native';
import reducers from './reducers';

const reducer = combineReducers(reducers);
const initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(
    apiMiddleware,
));
```

# Usage 

```js
import { CALL_API } from 'redux-api-middleware-native';

function action() {
    return {
        [CALL_API]: {
            endpoint: 'http://www.example.com/resource',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                'username' : 'npm-user',
                'password' : 'test'
            },
            types: ['SUCCESS', 'FAILURE', 'ERROR'],
            meta: {
                id: 'Data to reducer'
            }
        }
    }
}
```

# Custom payload / meta handler

```js
import { CALL_API } from 'redux-api-middleware-native';

function action() {
    return {
        [CALL_API]: {
            endpoint: 'http://www.example.com/resource',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                'username' : 'npm-user',
                'password' : 'test'
            },
            types: [{
              type: 'SUCCESS',
              payload: (action, state, res) => {
                  return res.json().then((json) => {
                      // Inserting a header in response
                      json.token = res.headers.get('Authorization');
                      return json;
                  });
              },
              meta: (action, state) => {
                  return action.meta;
              }
            }, 'FAILURE', 'ERROR'],
            meta: {
                id: 'Data to reducer'
            }
        }
    }
}
```
# Responses

## SUCCESS
```js
Action {
    type = types[0]
    payload = JSON parsed response
    error = false
    meta = Any data that you sent
}
```

## FAILURE
Type failure means your request not get HTTP status code 200 without any other errors.

```js
Action {
    type = types[1]
    payload = JSON parsed response
    error = true
    meta = Any data that you sent
}
```

## ERROR
Type error means we got exception on some point of code (ex. response parsing).

```js
Action {
    type = types[2]
    payload = ERROR object
    error = true
    meta = Any data that you sent
}
```
