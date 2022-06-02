import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { ConfigSettingsFormComponent } from '../components/config-settings-form/config-settings-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EditPageRoutingModule],
  declarations: [EditPage, ConfigSettingsFormComponent],
})
export class EditPageModule {}
