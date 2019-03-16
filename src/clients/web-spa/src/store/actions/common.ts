import { Dispatch } from "redux";
import { ApplicationState } from "../state";
import axios, { AxiosInstance } from 'axios';

export type ThunkAction<R = void> = (dispatch: Dispatch, getState: () => ApplicationState) => R;

export const apiClient : AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_LOCATION,
    timeout: 10000
});