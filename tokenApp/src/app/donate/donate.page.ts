import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {

  constructor(private router: Router) { }

  @ViewChild('#formId') paypalForm;

  public versionNumber: number;

  ngOnInit() {
    this.versionNumber = 1;
  }

  onSubmit(form){
    const paypalForm = document.getElementById('#formId') as HTMLFormElement;
    paypalForm.submit();
  }

  onSpendTokens() {
    const params = { spend: 'true' };
    this.router.navigate(['send-detail'], { queryParams: params });
  }
}
