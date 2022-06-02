import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, IonicModule, EditPageRoutingModule, SharedModule],
  declarations: [EditPage],
})
export class EditPageModule {}
