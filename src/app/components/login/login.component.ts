import { I18nService } from './../../utils/i18n/i18n.service';
import { ToastService } from 'src/app/utils/toast/toast.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { LogIn } from 'src/app/models/user/log-in.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: LogIn = {username: '', password: ''};

    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastService: ToastService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private i18n: I18nService) { 
            this.matIconRegistry.addSvgIcon(
                'facebook',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/facebook.svg')
            );

            this.matIconRegistry.addSvgIcon(
                'google',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/google.svg')
            );

            this.matIconRegistry.addSvgIcon(
                'twitter',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/twitter.svg')
            );

            this.matIconRegistry.addSvgIcon(
                'linkedin',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/linkedin.svg')
            );

            this.matIconRegistry.addSvgIcon(
                'gitlab',
                this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/gitlab.svg')
            );
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(loginForm:NgForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    let code: string = error;
                    this.toastService.showErrorCode(code);
                    this.loading = false;
                });
    }

    onClickSocialMediaButton(socialMedia: string) {
        console.log("selected media: " + socialMedia);
    }
}