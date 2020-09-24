import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { AddTodos, DeleteTodos, UpdateData } from "../../Store/action/todos";
import Tabel from "../Table/Table";

const Form = (props) => {
  const { todos, addTodo, deleteTodo, updateData } = props;
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    setData(todos);
  }, [todos, id]);

  const { handleSubmit, register, errors, setValue } = useForm();
  const onSubmit = (values, e) => {
    if (id !== null) {
      const obj = {
        id,
        values,
      };
      updateData(obj);
      setId(null);
    } else {
      addTodo(values);
    }
    e.target.reset();
  };

  const onRemove = (id) => {
    deleteTodo(id);
  };

  const onUpdate = (id) => {
    setId(id);
    const findItem = data.find((item) => item.id === id);
    if (findItem) {
      setValue("day", findItem.day, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("activities", findItem.activities, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="pt-4">
      <div className="text-center">
        <h2>Todo List</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="day">Day :</label>
          <input
            type="text"
            name="day"
            className="form-control"
            ref={register({
              required: "Required",
            })}
            required
          />
          {errors.day && errors.day.message}
        </div>
        <div className="form-group">
          <label htmlFor="name">Activities :</label>
          <input
            type="text"
            name="activities"
            className="form-control"
            ref={register({
              required: "Required",
            })}
            required
          />
          {errors.activities && errors.activities.message}
        </div>

        <button type="submit" className="btn btn-success">
          {id != null ? "Update" : "Create"}
        </button>
      </form>
      <hr />
      <Tabel todo={data} remove={onRemove} update={onUpdate} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (value) => {
      dispatch(AddTodos(value));
    },
    deleteTodo: (id) => dispatch(DeleteTodos(id)),
    updateData: (value) => dispatch(UpdateData(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
