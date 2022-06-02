import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSettingsFormComponent } from './components/config-settings-form/config-settings-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ConfigSettingsFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [ConfigSettingsFormComponent],
})
export class SharedModule {}
