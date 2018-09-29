//@ts-check
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Counter from './components/Counter';
import reducer from './reducers/reducers';
import { helloSaga } from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware(); // middlewareを作成する
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware) // ここでmiddlewareがstoreに接続される
);
sagaMiddleware.run(helloSaga); // ここでSagaが起動する

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
