import { Dispatch, Action } from "redux";
import { ApplicationState } from "../reducers";

export interface AsyncAction<TAction, TDispatchResponse = void>{
    (dispatch: (action: TAction) => TDispatchResponse, getState: () => ApplicationState): void;
};

export type AsyncActionCreator<T extends Action> = (...args: any) => AsyncAction<T>;

export type ActionCreator<T extends Action> = (...args: any) => T | AsyncAction<T>;

export type ActionCreatorMap<A extends Action, T extends string> = {
    [name in T]: ActionCreator<A>;
}

type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;

export interface VoidFunctionOf<T>{
    (... args: ArgumentsType<T>): void;
}

export type MakeDispatchProps<TActionCreatorMapType extends ActionCreatorMap<any, keyof {}>> = {
    [name in keyof TActionCreatorMapType]: VoidFunctionOf<TActionCreatorMapType[name]>;
}