import { I18nService } from './../../utils/i18n/i18n.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.css']
})
export class ChangeLanguageComponent implements OnInit {
  languages = [
    {value: 'pl', viewValue: "CHANGE_LANGUAGE.LANGUAGES.PL", code: 'pl'},
    {value: 'en', viewValue: "CHANGE_LANGUAGE.LANGUAGES.EN", code: 'gb'}
  ];
  defaultLanguage: string;

  constructor(private i18n: I18nService) { }

  ngOnInit() {
    this.defaultLanguage = this.i18n.getUseLanguage();
  }

  onChangeLanguage(value: string) {
    this.i18n.changeLanguage(value);
  }
}
