import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import { ConfigSettingsFormComponent } from '../components/config-settings-form/config-settings-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreatePageRoutingModule],
  declarations: [CreatePage, ConfigSettingsFormComponent],
})
export class CreatePageModule {}
