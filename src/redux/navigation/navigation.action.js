import { navigationActions } from "./navigation.type";

export const changeCurrentPage = page => ({
    type: navigationActions.CHANGE_PAGE,
    payload: page
})