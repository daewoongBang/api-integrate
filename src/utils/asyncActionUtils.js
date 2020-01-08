const createAsyncDispatcher = (type, promiseFn) => {
  // 성공, 실패에 대한 액션 타입 문자열 준비.
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  const actionHandler = async (dispatch, ...rest) => {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e
      });
    }
  };

  return actionHandler;
};

const initialAsyncState = {
  loading: false,
  data: null,
  error: null
};

// 로딩 중
const loadingState = {
  loading: true,
  data: null,
  error: null
};

// 성공했을 때 상태
const success = data => ({
  loading: false,
  data,
  error: null
});

// 실패했을 때 상태
const error = error => ({
  loading: false,
  data: null,
  error: error
});

const createAsyncHandler = (type, key) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  const handler = (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        };
      default:
        return state;
    }
  };

  return handler;
};

export default createAsyncDispatcher;
export { initialAsyncState, createAsyncHandler };
