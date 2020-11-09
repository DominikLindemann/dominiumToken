import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { Setting } from '../model/setting.model';
import { NavController } from '@ionic/angular';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  keyText = '';
  constructor(
    private navController: NavController,
    private cryptoService: CryptoService,
    private settingService: SettingService) { }

  setting: Setting;
  keyExists: boolean;
  async ngOnInit() {
    this.setting = await this.settingService.getSettingById(this.settingService.KeyToken);
    this.keyExists = (this.setting.value !== '');
  }

  onSave() {
    const encryptedText = this.cryptoService.encrypt(this.keyText);
    this.setting.value = encryptedText;
    this.settingService.updateEntry(this.setting).then(() => {
      this.navController.navigateRoot('home');
    });
  }
}
