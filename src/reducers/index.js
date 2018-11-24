export const reducer = (state = {}, action) => {
    console.log("here");
    console.log("Current state", state);
    if (action.type === "REPO"){
        console.log(action);
        console.log("WE HERE BOISSS");
        return {...state, repo: action.repo};
    }
    else if (action.type === "PROFILE") {
        return {...state, profile: action.profile}
    }

    return state;
}