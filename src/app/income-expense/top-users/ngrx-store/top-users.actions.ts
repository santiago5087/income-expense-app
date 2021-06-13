import { createAction, props } from '@ngrx/store';
import { UserTop } from '../../../models/userTop.model';

export const LOAD_TOPUSERS = createAction('[TopUsers] Load top-users');

export const LOAD_TOPUSERS_FAIL = createAction(
  '[TopUsers] Load top-users Fail',
  props<{ payload: any }>()
  );

export const LOAD_TOPUSERS_SUCCESS = createAction(
  '[TopUsers] Load top-users Success',
  props<{ topUsers: UserTop[] }>()
  );
