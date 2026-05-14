import { useReducer, useCallback } from "react";
import { userService } from "../services/userService.js";

const ACTIONS = {
  FETCH_START:  "FETCH_START",
  FETCH_OK:     "FETCH_OK",
  FETCH_ERR:    "FETCH_ERR",
  ADD:          "ADD",
  UPDATE:       "UPDATE",
  REMOVE:       "REMOVE",
  SET_LOADING:  "SET_LOADING",
};

const initialState = {
  users:   [],
  loading: false,
  saving:  false,
  error:   null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };
    case ACTIONS.FETCH_OK:
      return { ...state, loading: false, users: action.payload };
    case ACTIONS.FETCH_ERR:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, saving: action.payload };
    case ACTIONS.ADD:
      return { ...state, saving: false, users: [...state.users, action.payload] };
    case ACTIONS.UPDATE:
      return {
        ...state,
        saving: false,
        users: state.users.map(u => (u.id === action.payload.id ? action.payload : u)),
      };
    case ACTIONS.REMOVE:
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload),
      };
    default:
      return state;
  }
}

export function useUsersStore() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = useCallback(async () => {
    dispatch({ type: ACTIONS.FETCH_START });
    try {
      const users = await userService.getAll();
      dispatch({ type: ACTIONS.FETCH_OK, payload: users });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_ERR, payload: err.message });
    }
  }, []);

  const addUser = useCallback(async (data) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    const user = await userService.create(data);
    dispatch({ type: ACTIONS.ADD, payload: user });
    return user;
  }, []);

  const updateUser = useCallback(async (id, data) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    const user = await userService.update(id, data);
    dispatch({ type: ACTIONS.UPDATE, payload: user });
    return user;
  }, []);

  const removeUser = useCallback(async (id) => {
    await userService.remove(id);
    dispatch({ type: ACTIONS.REMOVE, payload: id });
  }, []);

  return { ...state, fetchUsers, addUser, updateUser, removeUser };
}
