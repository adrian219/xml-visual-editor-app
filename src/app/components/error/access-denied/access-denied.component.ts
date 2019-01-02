import { I18nService } from 'src/app/utils/i18n/i18n.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(private i18n: I18nService) { }

  ngOnInit() {
  }

}
