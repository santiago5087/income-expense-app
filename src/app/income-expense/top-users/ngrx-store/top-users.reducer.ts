import { createReducer, on, Action } from "@ngrx/store";
import { UserTop } from "../../../models/userTop.model";
import { LOAD_TOPUSERS, LOAD_TOPUSERS_FAIL, LOAD_TOPUSERS_SUCCESS } from './top-users.actions';

export interface TopUsersState {
  topUsers: UserTop[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initState: TopUsersState = {
  topUsers: [],
  loaded: false,
  loading: false,
  error: null
}

// Se crea la función que recibe los parámetros de state y action
const _topUsersReducer = createReducer<TopUsersState>(
  initState,
  on(LOAD_TOPUSERS, (state) => ({ 
    ...state, 
    loading: true 
  })),
  on(LOAD_TOPUSERS_SUCCESS, (state, { topUsers }) => ({
    ...state,
    loading: false,
    loaded: true,
    topUsers: [...topUsers]
  })),
  on(LOAD_TOPUSERS_FAIL, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: {
      status: payload.status,
      message: payload.message,
      url: payload.url
    }
  }))
);

export function topUsersReducer(state: TopUsersState, action: Action): TopUsersState {
  return _topUsersReducer(state, action);
}
