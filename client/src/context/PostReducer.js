import {SEARCH_USER, CLEAR_SEARCH} from '../state_types';

export default (state, { type, payload }) => {
    switch (type) {
        case SEARCH_USER:
            const reg = new RegExp(`${payload}`, 'gi')
            return {
                ...state,
                search: state.posts.filter(post => post.name.match(reg))
            }

        case CLEAR_SEARCH:
            return {
                ...state,
                search:null
            }
        default:
            return state
    }
}