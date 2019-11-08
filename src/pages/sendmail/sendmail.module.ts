import { NgModule } from '@angular/core';
import { IonicPageModule , IonicModule  } from 'ionic-angular';
import { SendmailPage } from './sendmail';

@NgModule({
  declarations: [
    SendmailPage,
  ],
  imports: [
    IonicPageModule.forChild(SendmailPage),
  ],
})
export class SendmailPageModule {}
