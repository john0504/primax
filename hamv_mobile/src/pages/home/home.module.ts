import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule,
    ComponentsModule,
    DirectivesModule,
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule { }