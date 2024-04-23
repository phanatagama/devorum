export const ActionTypes = {
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
};

export const showLoading = () => ({
  type: ActionTypes.SHOW_LOADING,
  payload: {
    isLoading: true,
  },
});

export const hideLoading = () => ({
  type: ActionTypes.HIDE_LOADING,
  payload: {
    isLoading: false,
  },
});
