import { map } from 'rxjs/operators';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { ToastService } from 'src/app/utils/toast/toast.service';

@Directive({
  selector: '[syntaxXml]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: XmlSyntaxDirective, multi: true}]
})
export class XmlSyntaxDirective implements AsyncValidator {

  constructor(
    private validationService: ValidationService,
    private toastService: ToastService
    ) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.validationService.validate(c.value).pipe(
      map(result => {
        if(!result.validate) {
          this.toastService.showError(result.errorMessage);
        }
        return !result.validate ? {"syntaxXml": true} : null;
      })
    );
  }

}
