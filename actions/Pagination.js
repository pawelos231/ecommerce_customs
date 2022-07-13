export const SetPaginatedSite = (page) => async (dispatch) => {
  dispatch({ type: "SWITCH_PAGE", payload: page });
};
