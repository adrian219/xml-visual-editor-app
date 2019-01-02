import { I18nService } from './../../../utils/i18n/i18n.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private i18n: I18nService) { }

  ngOnInit() {
  }

}
