import { combineReducers } from 'redux';
import { navigationReducer } from './navigation/navigation.reducer';
import { userReducer } from './user/user.reducer';


const rootReducer = combineReducers({
     navbar: navigationReducer,
     user: userReducer
});

export default rootReducer;