export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "REPO":
      return { ...state, repo: action.repo };
    case "PROFILE":
      return { ...state, profile: action.profile };
    case "SEARCH":
      return { ...state, search: action.search };
    default:
      return state;
  }
};
