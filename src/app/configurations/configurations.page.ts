/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfiguration } from 'src/assets/proto/configuration';
import { IConfigListItem } from '../context/global.model';
import { ApplicationService } from '../core/application.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
})
export class ConfigurationsPage implements OnInit {
  public listOfConfigurations: IConfigListItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  private initialize(): void {
    this.listOfConfigurations = this.appService.getConfigs();
  }

  public onCreate(): void {
    this.router.navigate(['./create'], { relativeTo: this.activatedRoute });
  }

  public onEdit(item: IConfigListItem): void {
    this.router.navigate([`./edit/${item.uid}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
