// action creators

export const userAction = state => ({
  user: state
});

export const repoInformation = repo => ({
  type: "REPO",
  repo
});
export const profileData = profile => ({
  type: "PROFILE",
  profile
});

export const searchInfo = search => ({
  type: "SEARCH",
  search
});
