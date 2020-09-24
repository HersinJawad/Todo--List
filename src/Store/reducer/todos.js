import * as actionTypes from "../action/actionType";

const initialState = [];
let countId = 0;

const addTodo = (state, payload) => {
  return [
    ...state,
    {
      id: countId++,
      day: payload.day,
      activities: payload.activities,
    },
  ];
};

const deleteTodo = (state, payload) => {
  const updateArray = state.filter((item) => item.id !== payload);
  return updateArray;
};

const updateTodo = (state, payload) => {
  const obj = {
    id: payload.id,
    day: payload.values.day,
    activities: payload.values.activities,
  };
  const index = state.findIndex((item) => {
    return item.id === obj.id;
  });
  let newArr = [...state];
  newArr[index] = obj;
  return newArr;
};

const todos = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.ADD_TODOS:
      return addTodo(state, payload);
    case actionTypes.DELETE_TODOS:
      return deleteTodo(state, payload);
    case actionTypes.UPDATE_TODOS:
      return updateTodo(state, payload);
    default:
      return state;
  }
};

export default todos;
