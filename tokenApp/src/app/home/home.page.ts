import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private navController: NavController,) { }

  refreshSubject = new Subject<any>();
  ngOnInit() {
  }

  async ionViewWillEnter() {

    console.log('refreshSubject homepage');
    this.refreshSubject.next({do: true})
  }
}
