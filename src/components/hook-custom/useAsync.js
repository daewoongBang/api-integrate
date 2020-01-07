import { useReducer, useEffect } from "react";

// 데이터를 요청해야 할 때마다 리듀서를 작성하는 것은 번거롭기 때문에
// 커스텀 Hook을 만들어서 요청 상태 관리 로직을 쉽게 재사용하기.

// useReducer로 요청 상태 관리
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// callback: API 요청을 시작하는 함수, deps: 해당 함수 안에서 사용하는 useEffect의 deps
// skip: 필요할 때에만 요청할 수 있도록 처리
const useAsync = (callback, deps = [], skip = false) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
};

export default useAsync;
