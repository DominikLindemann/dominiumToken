import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Setting } from '../model/setting.model';


@Injectable({providedIn: 'root' })
export class DatabaseService extends Dexie {
  public settingTable: Dexie.Table<Setting, string>;


  constructor() {
    super('dl_dtoken_db');

    this.version(1).stores({
      settingTable: 'key',
    });
  }
}
