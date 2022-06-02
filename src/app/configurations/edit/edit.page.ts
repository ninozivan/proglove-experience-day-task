import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
export class EditPage implements OnInit {
  public destroyed$: Subject<boolean> = new Subject();
  public configuration!: IConfiguration;

  constructor(
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

  public onFormValueChanged(config: IConfiguration): void {
    console.log('config changed on edit page: ', config);
  }

  public onSaveChanges(): void {}

  private initialize(itemId: string): void {
    const configItem: IConfigListItem = this.appService
      .getConfigs()
      .find((item: IConfigListItem) => item?.uid === itemId);

    this.configuration = {
      timeout: configItem?.timeout,
      deviceName: configItem?.deviceName,
      audibleFeedback: configItem?.audibleFeedback,
      visibleFeedback: configItem?.visibleFeedback,
    };
  }
}
