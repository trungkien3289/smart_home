//  initial setup of actually creating the store and potentially loading any previously saved state. 

// Import the store function and state
import configureStore, { IAppState } from './rootReducer';
import { getAllCharacters } from './characters/actions';

export default function initApp() : void{
    // Generate the store
    const store = configureStore();

    // Loading some needed data at initial application.
    store.dispatch(getAllCharacters());
}