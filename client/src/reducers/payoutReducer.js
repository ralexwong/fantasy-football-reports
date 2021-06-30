import {
    FETCH_PAYOUT
    
} from '../actions/types';


const initialState = {

}


const store = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAYOUT:
            return {...state, }
        default:
            return state;
    }
}

export default store;