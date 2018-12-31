import { I18nService } from 'src/app/utils/i18n/i18n.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { ToastService } from 'src/app/utils/toast/toast.service';
import { SignUp } from 'src/app/models/user/sign-up.model';

@Component({
    selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    signUp: SignUp = {username: '', password: '', email: '', firstName: '', lastName: ''}
    loading = false;
    submitted = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private toastService: ToastService,
        private i18n: I18nService) { }

    ngOnInit() {
    }

    onSubmit(registerForm: NgForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.signUp)
            .pipe(first())
            .subscribe(
                data => {
                    this.toastService.showMessage('REGISTER.MESSAGES.SUCCESSFULL', 3000);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.toastService.showError(error);
                    this.loading = false;
                });
    }
}