import axios from 'axios';
import {GUARDIAN_CONTENT, IS_LOADING, IS_PINNED, RESULTS, ERROR, HAS_CONTENT_INFO} from '../actions/types';

export function getContent(content) {
    return {
        type: GUARDIAN_CONTENT,
        content
    }
}

export function setIsLoading(isLoading) {
    return {
        type: IS_LOADING,
        isLoading
    }
}

export function setIsPinned(isPinned) {
    return {
        type: IS_PINNED,
        isPinned
    }
}

export function setResults(results) {
    return {
        type: RESULTS,
        results
    }
}

export function setError(error) {
    return {
        type: ERROR,
        error
    }
}

export function setHasContentInfo(hasContentInfo){
    return {
        type: HAS_CONTENT_INFO,
        hasContentInfo
    }
}


export function getGuardianContent() {

    const apiUrl = 'https://content.guardianapis.com/search?q=debates&api-key=test';

    return (dispatch) => {
        return axios.get(`${apiUrl}`)
            .then(response => {
                if (response.data.response.status === "ok") {
                    let pinnedJSON = {"isPinned": false};
                    let results = response.data.response.results;
                    results.map(item => (
                        item = Object.assign(item, pinnedJSON)
                    ));
                    dispatch(setResults(results));
                    dispatch(setHasContentInfo(true));
                } else {
                    dispatch(setHasContentInfo(false));
                    dispatch(setError("Failure in getting debate content."));
                }
                dispatch(getContent(response.data.response.results))
                dispatch(setIsLoading(true));
            })
            .catch(error => {
                dispatch(setHasContentInfo(false));
                dispatch(setError(error.toString()));
            });
    };
};

export function getGuardianContentWithQueryParam(queryParam, pinnedContent) {

    const apiUrl = `https://content.guardianapis.com/search?q=debate%20AND%20${queryParam}&api-key=test`;

    return (dispatch) => {
        return axios.get(`${apiUrl}`)
            .then(response => {
                if (response.data.response.status === "ok") {
                    let results = response.data.response.results;
                    let combinedContent = results.concat(pinnedContent);
                    dispatch(setResults(combinedContent));
                    dispatch(setHasContentInfo(true));
                } else {
                    dispatch(setHasContentInfo(false));
                    dispatch(setError("Failure in getting debate content."));
                }
                let combinedContent = response.data.response.results.concat(pinnedContent);
                dispatch(getContent(combinedContent))
                dispatch(setIsLoading(true));
            })
            .catch(error => {
                dispatch(setHasContentInfo(false));
                dispatch(setError(error.toString()));
            });
    };
};

export const guardianAction = {
    getGuardianContent,
    setIsLoading,
    getGuardianContentWithQueryParam
};
