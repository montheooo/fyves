import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { GeofencePage } from './geofence';

@NgModule({
  declarations: [GeofencePage],
	entryComponents: [GeofencePage],
	imports: [IonicModule]

})
export class GeofencePageModule {}
