//@ts-check
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Counter from './components/Counter';
import reducer from './reducers/reducers';
import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware(); // middlewareを作成する
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware) // ここでmiddlewareがstoreに接続される
);
sagaMiddleware.run(rootSaga); // ここでSagaが起動する。複数のsagaが起動する場合は、rootSagaを経由する。

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />, // StoreのアクションにonIncrementAsynsを接続する
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
