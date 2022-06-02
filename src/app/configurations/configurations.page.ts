/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IConfigListItem } from '../context/global.model';
import { ApplicationService } from '../core/application.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.page.html',
  styleUrls: ['./configurations.page.scss'],
})
export class ConfigurationsPage implements OnInit, OnDestroy {
  public destroyed$: Subject<boolean> = new Subject();
  public listOfConfigurations: IConfigListItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private initialize(): void {
    this.appService
      .observeListOfConfigs()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((listOfConfigs: IConfigListItem[]) => {
        this.listOfConfigurations = listOfConfigs;
      });
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
