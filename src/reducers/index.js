export const reducer = (state = {}, action) => {
    if (action.type === "REPO"){
        return {...state, repo: action.repo};
    }
    else if (action.type === "PROFILE") {
        return {...state, profile: action.profile}
    }
    else if (action.type === "SEARCH") {
        return {...state, search: action.search}
    }

    return state;
}