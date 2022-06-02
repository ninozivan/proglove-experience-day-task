import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationsPageRoutingModule } from './configurations-routing.module';

import { ConfigurationsPage } from './configurations.page';
import { ConfigSettingsFormComponent } from './components/config-settings-form/config-settings-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationsPageRoutingModule,
  ],
  declarations: [ConfigurationsPage, ConfigSettingsFormComponent],
})
export class ConfigurationsPageModule {}
