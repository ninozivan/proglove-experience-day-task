import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSettingsFormComponent } from './components/config-settings-form/config-settings-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfigSettingsFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ConfigSettingsFormComponent],
})
export class SharedModule {}
