import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class I18nService {
    currentLanguage: string;

    constructor(private translate: TranslateService) {
        translate.addLangs(['pl', 'en']);
        translate.setDefaultLang('pl');

        const browserLang = translate.getBrowserLang();

        this.currentLanguage = browserLang.match(/pl|en/) ? browserLang : 'pl';
        translate.use(this.currentLanguage);
    }

    changeLanguage(language: string) {
        this.translate.use(language);
    }

    getUseLanguage() {
        return this.currentLanguage;
    }

    getValue(i18nCode: string) {
        return this.translate.get(i18nCode);
    }
}