import { combineReducers } from 'redux';
import { navigationReducer } from './navigation/navigation.reducer';


const rootReducer = combineReducers({
     navbar: navigationReducer
});

export default rootReducer;