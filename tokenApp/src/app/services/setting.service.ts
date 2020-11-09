import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Setting } from '../model/setting.model';


@Injectable({providedIn: 'root' })
export class SettingService extends DatabaseService{

  public KeyIsInitFinished = 'IsInitFinished';
  public KeyVersion = 'Version';
  public VersionNumber = '1.0.0';
  public  KeyToken = 'pKey';

  constructor() {
    super();
  }

  getSettings(): Dexie.Promise<Setting[]> {
    return this.settingTable.toArray();
  }

  async getSettingById(id: string): Promise<Setting> {
    return await this.settingTable.get(id) as Setting;
  }

  async getSettingValueById(id: string): Promise<string> {
    const setting = await this.settingTable.get(id) as Setting;
    return setting.value;
  }

  public async initSettings(): Promise<void> {
    await this.createIfNotExists(this.KeyIsInitFinished, 'false');
    await this.createIfNotExists(this.KeyVersion, this.VersionNumber);
    await this.createIfNotExists(this.KeyToken, '');
  }

  public async updateEntry(setting: Setting): Promise<number>{
    return await this.settingTable.update(setting.key, setting);
  }
  
  private async createIfNotExists(key: string, value: string): Promise<void> {
    const setting = await this.getSettingById(key);
    if (!setting) {
      console.log('no setting for ' + key);
      await this.settingTable.add({key: key, value: value});
    }
  }
}
