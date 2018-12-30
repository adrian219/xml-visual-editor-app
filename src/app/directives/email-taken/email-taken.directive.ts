import { CheckTakenService } from './../../services/check-taken/check-taken.service';
import { map } from 'rxjs/operators';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[checkEmailIsTaken]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: EmailTakenDirective, multi: true}]
})
export class EmailTakenDirective implements AsyncValidator {

  constructor(
    private checkTakenService: CheckTakenService
    ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.checkTakenService.checkEmail({checking: c.value}).pipe(
      map(result => {
        return !result.check ? {"checkEmailIsTaken": true} : null;
      })
    );
  }

}
