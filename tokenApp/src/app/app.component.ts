import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SettingService } from './services/setting.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  subscription: Subscription;

  public appPages = [
    {
      title: 'Token',
      url: '/home',
      icon: 'disc-outline'
    },
    {
      title: 'Tokeninfo',
      url: '/tokeninfo',
      icon: 'information-outline'
    },
    {
      title: 'Setting',
      url: '/setting',
      icon: 'construct-outline'
    },
    {
      title: 'Contact',
      url: '/donate',
      icon: 'list'
    },
    {
      title: 'Legal Notice',
      url: '/legalnotice',
      icon: 'book'
    },
  ];

  network: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private settingService: SettingService,
    private alertController: AlertController,
  ) {
    this.network = environment.chainName + ' id: ' + environment.chainId;
    
    this.initializeApp();
    this.backButtonEvent();
  }

  // https://stackoverflow.com/questions/53079255/ionic-4-setting-root-page
  initializeApp() {
    this.platform.ready().then(async () => {
      const setting = await this.settingService.getSettingById(this.settingService.KeyToken);
      if (!setting) {
        await this.settingService.initSettings();
        console.log('do create', setting);
        this.router.navigateByUrl('setting');
      } else {
        if (setting.value === '') {
          this.router.navigateByUrl('setting');
        }
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  //https://github.com/ionic-team/ionic/issues/17984
  backButtonEvent(){
    this.subscription = this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home/tabs/token', true) && this.router.url === '/home/tabs/token') {
          const alert = await this.alertController.create({
            header: 'Close dominiumToken app?',
            cssClass: 'alertCss',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'cancelButton',
              }, {
                text: 'Close',
                cssClass: 'okButton',
                handler: () => {
                  navigator['app'].exitApp();
                }
              }
            ]
          });

          await alert.present();
        }
        else {
          window.history.back();
        }
      });
  }

  ionViewWillLeave(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
