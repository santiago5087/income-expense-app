import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, exhaustMap } from 'rxjs/operators'

import { LOAD_TOPUSERS, LOAD_TOPUSERS_SUCCESS } from './top-users.actions';
import { UserService } from '../../../services/userTop.service';

@Injectable()
export class TopUsersEffects {

  /*
  Las actions$ van a estar escuchando cualquier acción que sea disparada al store.
  Con el ofType selecciono la acción a la cual estoy interesado para dispara el 
  efecto.
  */

  constructor(private actions$: Actions,
              private topUserService: UserService ) { }

  loadTopUsers$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_TOPUSERS),  // Se recibe la action del tipo seleccionado y se pasa al mergeMap
    exhaustMap(action => {
      return this.topUserService.getTopUsers()
      .pipe(
        // Se dispara la acción de top users success cuando se obtienen los usuarios
        // Para evitar que se dispare otra acción se pasa el dispatch: false
        map(topUsers => LOAD_TOPUSERS_SUCCESS({ topUsers }))
      )})
    ));

}
