import { Dispatch, Action } from "redux";
import { ApplicationState } from "../reducers";

export type AsyncAction<T extends Action> = (dispatch: Dispatch<T>, getState: () => ApplicationState) => Promise<any> | void;

export type ActionCreator<T extends Action> = (...args: any) => T | AsyncAction<T>;

export interface ActionCreatorMap<T extends Action>{
    [name: string]: ActionCreator<T>
}