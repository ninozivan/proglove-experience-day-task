/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IConfigListItem } from 'src/app/context/global.model';
import { ApplicationService } from 'src/app/core/application.service';
import { IConfiguration } from 'src/assets/proto/configuration';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  public destroyed$: Subject<boolean> = new Subject();
  public configuration!: IConfiguration;
  private listItem!: IConfigListItem;
  public formIsValid!: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: ApplicationService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        this.initialize(params.id);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private initialize(itemId: string): void {
    this.listItem = this.appService
      .getConfigs()
      .find((item: IConfigListItem) => item?.uid === itemId);

    this.configuration = {
      timeout: this.listItem?.timeout,
      deviceName: this.listItem?.deviceName,
      audibleFeedback: this.listItem?.audibleFeedback,
      visibleFeedback: this.listItem?.visibleFeedback,
    };
  }

  public onFormValueChanged(config: IConfiguration): void {
    this.listItem = { ...this.listItem, ...config };
  }

  public onSaveChanges(): void {
    this.appService.updateConfig(this.listItem);
    this.router.navigateByUrl('/configurations');
  }

  public onFormValidStateChanged(state: boolean): void {
    this.formIsValid = state;
  }
}
