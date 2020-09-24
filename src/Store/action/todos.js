import * as actionTypes from "./actionType";

export const AddTodos = (values) => {
  return { type: actionTypes.ADD_TODOS, payload: values };
};

export const DeleteTodos = (id) => {
  return { type: actionTypes.DELETE_TODOS, payload: id };
};

export const UpdateData = (value) => {
  return { type: actionTypes.UPDATE_TODOS, payload: value };
};
