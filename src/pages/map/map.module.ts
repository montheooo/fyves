import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { MapPage } from './map';
import { IonicSelectableComponent, IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [MapPage],
	entryComponents: [MapPage],
	imports: [IonicModule, IonicSelectableModule]

})
export class MapPageModule {}
