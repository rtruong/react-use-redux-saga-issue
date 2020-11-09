import { all, put, takeEvery } from "redux-saga/effects";
import {
  ActionType,
  createReducer,
  createStandardAction,
  getType,
} from "typesafe-actions";
import { AppState } from "./AppState";

const decrement = createStandardAction("DECREMENT")<undefined>();

const increment = createStandardAction("INCREMENT")<undefined>();

export const sagaDecrement = createStandardAction("SAGA_DECREMENT")<
  undefined
>();

export const sagaIncrement = createStandardAction("SAGA_INCREMENT")<
  undefined
>();

export const appReducer = createReducer<
  AppState,
  ActionType<
    | typeof decrement
    | typeof increment
    | typeof sagaDecrement
    | typeof sagaIncrement
  >
>({
  count: 0,
})
  .handleAction(decrement, ({ count }) => ({
    count: count - 1,
  }))
  .handleAction(increment, ({ count }) => ({
    count: count + 1,
  }));

function* doDecrement() {
  yield put(decrement());
}

function* doIncrement() {
  yield put(increment());
}

export function* appSaga() {
  yield all([
    takeEvery(getType(sagaDecrement), doDecrement),
    takeEvery(getType(sagaIncrement), doIncrement),
  ]);
}
