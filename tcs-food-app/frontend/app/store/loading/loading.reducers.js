import { createReducer } from "@reduxjs/toolkit";
import { show, hide } from "./loading.actions";

const initialState = {
    show: false
}

export const loadingReducer = createReducer(initialState, builder => {
    builder.addCase(show, () => {
        return {show: true};
    }),
    builder.addCase(hide, () => {
        return {show: false};
    })
})