import { userTypes } from "./user.types";

export const SetUser = user => ({
    type: userTypes.SET_USER,
    payload: user
})