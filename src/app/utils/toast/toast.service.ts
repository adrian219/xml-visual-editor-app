import { I18nService } from './../i18n/i18n.service';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar,
    private i18nService: I18nService) { }

  showMessage(i18nCode: string, duration: number) {
    this.getString(i18nCode).subscribe(result => {
      this.snackBar.open(result, null, {
        duration: duration,
      });
    });
  }

  showError(error: string) {
    this.snackBar.open(error, 'Close');
  }

  private getString(i18nCode: string) {
    return this.i18nService.getValue(i18nCode);
  }
}
