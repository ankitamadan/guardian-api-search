import { GUARDIAN_CONTENT, IS_LOADING, IS_PINNED, RESULTS, ERROR, HAS_CONTENT_INFO } from '../actions/types';

const initialState = {
    content: [],
    isLoading: false,
    isPinned: false,
    results: [],
    error: [],
    hasContentInfo: false
};

export default function guardianReducer(state = initialState, action) {
    switch (action.type) {
        case GUARDIAN_CONTENT :
            return { ...state, content: action.content };
        case IS_LOADING :
            return { ...state, isLoading: action.isLoading };
        case IS_PINNED :
            return { ...state, isPinned: action.isPinned };
        case RESULTS :
            return { ...state, results: action.results };
        case ERROR :
            return { ...state, error: action.error };
        case HAS_CONTENT_INFO :
            return { ...state, hasContentInfo: action.hasContentInfo };
        default:
            return state;
    }
}
