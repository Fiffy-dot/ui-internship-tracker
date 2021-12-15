import { navigationActions } from "./navigation.type"


const INITIAL_STATE = {
    page: "dashboard",
    old: "me"
}

export const navigationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case navigationActions.CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            }
        default:
            return state
    }
};
