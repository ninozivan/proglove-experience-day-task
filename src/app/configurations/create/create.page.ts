import { Component, OnInit } from '@angular/core';
import { IConfiguration } from 'src/assets/proto/configuration';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  constructor() {}

  ngOnInit() {}

  public onFormValueChanged(config: IConfiguration): void {
    console.log('config changed on create page: ', config);
  }
}
