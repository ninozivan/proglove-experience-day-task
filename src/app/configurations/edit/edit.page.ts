import { Component, OnInit } from '@angular/core';
import { IConfiguration } from 'src/assets/proto/configuration';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  public onFormValueChanged(config: IConfiguration): void {
    console.log('config changed on edit page: ', config);
  }
}
