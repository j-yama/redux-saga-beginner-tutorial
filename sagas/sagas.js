//@ts-check
import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';

export function* helloSaga() {
    console.log('Hello Sagas!');
}

// middlewareに対してyieldされたobjectはPromiseが完了するまで、middlewareがSagaをsuspendする。
// この例では、incrementAsync SagaはdelayがPromiseを返却するまで、1分suspendされる。
export function* incrementAsync() {
    yield delay(1000); // delayは指定したミリ秒の後に解決することをPromiseするutility関数
    // あるyieldがpromiseされたら、Sagaは再開され、次のyieldを実行する

    // 次のyieldはINCREMENTアクションをdispatchするようにmiddlewareに教えるもの
    yield put({ type: 'INCREMENT' }); // putはEffectと呼ばれるものの例。EffectがfulfilledされるまでSagaはポーズされる。
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync); // INCREMENT_ASYNCアクションがdispatchされるたびにincrementAsyncを実行する（takeEvery）
}

// rootSagaは常時起動させたいSagaを全て記述し、一度に起動させる
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync(),
    ])
}
