import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfigListItem } from 'src/app/context/global.model';
import { ApplicationService } from 'src/app/core/application.service';
import { IConfiguration } from 'src/assets/proto/configuration';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private listItem!: IConfigListItem;

  constructor(private appService: ApplicationService, private router: Router) {}

  ngOnInit() {}

  public onFormValueChanged(config: IConfiguration): void {
    this.listItem = { ...this.listItem, ...config };
  }

  public onCreateConfig(): void {
    this.appService.createNewConfig(this.listItem);
    this.router.navigateByUrl('/configurations');
  }
}
