import React, { useState, useLayoutEffect, ReducerAction } from "react";
import createSagaMiddleware from "redux-saga";
import {
  appReducer,
  sagaIncrement,
  sagaDecrement,
  appSaga,
} from "./AppReducer";
import createReducer from "react-use/lib/createReducer";
import { AppState } from "./AppState";

const useSaga = (reducer: typeof appReducer, initialState: AppState) => {
  const [middleware] = useState(() => createSagaMiddleware());
  const [_useSaga] = useState(() =>
    createReducer<ReducerAction<typeof appReducer>, AppState>(middleware)
  );
  const ret = _useSaga(reducer, initialState);

  useLayoutEffect(() => {
    const task = middleware.run(appSaga);

    return (): void => {
      task.cancel();
    };
  }, [middleware]);

  return ret;
};

function App() {
  const [{ count }, dispatch] = useSaga(appReducer, {
    count: 0,
  });

  return (
    <div>
      Count: <span>{count}</span>
      <button
        onClick={(): void => {
          dispatch(sagaIncrement());
        }}
      >
        +
      </button>
      <button
        onClick={(): void => {
          dispatch(sagaDecrement());
        }}
      >
        -
      </button>
    </div>
  );
}

export default App;
