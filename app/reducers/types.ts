import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type counterStateType = {
  counter: number;
};


export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

// export type DispatchWithPayload extends Dispatch = {
//   type: string,
//   payload: any
// }

export type Store = ReduxStore<counterStateType, Action<string>>;
