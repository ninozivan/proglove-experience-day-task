/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { auditTime, takeUntil } from 'rxjs/operators';

import { Configuration, IConfiguration } from 'src/assets/proto/configuration';

enum FeedbackTypes {
  AudibleFeedback = 1,
  VisibleFeedback,
}

interface IFeedbackType {
  type: FeedbackTypes;
  title: string;
}

interface IFeedbackTypeOption {
  enum: number;
  title: string;
}

interface IFormValue {
  deviceName: string;
  timeout: number;
  feedbackType: FeedbackTypes;
  feedbackOption: IFeedbackTypeOption;
}

@Component({
  selector: 'app-config-settings-form',
  templateUrl: './config-settings-form.component.html',
  styleUrls: ['./config-settings-form.component.scss'],
})
export class ConfigSettingsFormComponent implements OnInit, OnDestroy {
  @Output() formValueChanged: EventEmitter<IConfiguration> =
    new EventEmitter<IConfiguration>();

  @Input() set itemConfig(config: IConfiguration) {
    this.setupForm(config);
  }

  public destroyed$: Subject<boolean> = new Subject();
  public formGroup!: FormGroup;

  public initialFeedbackTypeValue: FeedbackTypes =
    FeedbackTypes.VisibleFeedback;

  public feedbackTypes: IFeedbackType[] = [
    {
      type: FeedbackTypes.AudibleFeedback,
      title: 'Audible',
    },
    {
      type: FeedbackTypes.VisibleFeedback,
      title: 'Visible',
    },
  ];

  public audibleOptions: IFeedbackTypeOption[] = [
    {
      enum: Configuration.AudibleFeedback.BEEP,
      title: 'BEEP',
    },
    {
      enum: Configuration.AudibleFeedback.BUUP_BUUP,
      title: 'BUUP_BUUP',
    },
    {
      enum: Configuration.AudibleFeedback.BEEP_BUUP,
      title: 'BEEP_BUUP',
    },
    {
      enum: Configuration.AudibleFeedback.BEEP_BEEP,
      title: 'BEEP_BEEP',
    },
  ];

  public visibleOptions: IFeedbackTypeOption[] = [
    {
      enum: Configuration.VisibleFeedback.GREEN,
      title: 'GREEN',
    },
    {
      enum: Configuration.VisibleFeedback.RED,
      title: 'RED',
    },
    {
      enum: Configuration.VisibleFeedback.BLUE,
      title: 'BLUE',
    },
  ];

  public feedbackTypeOptions!: IFeedbackTypeOption[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public setupForm(config: IConfiguration): void {
    this.formGroup?.reset();

    const initialFeedbackType: IFeedbackType =
      this.provideInitialFeedbackTypeOption(config);
    const initialFeedbackTypeOption: IFeedbackTypeOption =
      this.provideInitialOptionForFeedbackType(config);
    this.feedbackTypeOptions = this.provideInitialOptionsForFeedback(config);

    this.formGroup = this.formBuilder.group({
      deviceName: new FormControl(config?.deviceName || null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      timeout: new FormControl(config?.timeout || 0, [
        Validators.required,
        Validators.min(1),
        Validators.max(10000),
      ]),
      feedbackType: new FormControl(initialFeedbackType),
      feedbackOption: new FormControl(initialFeedbackTypeOption),
    });

    this.formGroup?.valueChanges
      ?.pipe(takeUntil(this.destroyed$), auditTime(300))
      .subscribe((formValues: IFormValue) => {
        const newConfig: IConfiguration = {
          deviceName: formValues?.deviceName,
          timeout: formValues?.timeout,
          visibleFeedback:
            formValues?.feedbackType === FeedbackTypes.AudibleFeedback
              ? formValues.feedbackOption.enum
              : null,
          audibleFeedback:
            formValues?.feedbackType === FeedbackTypes.VisibleFeedback
              ? formValues.feedbackOption.enum
              : null,
        };

        this.formValueChanged?.emit(newConfig);
      });

    this.formGroup?.controls?.feedbackType?.valueChanges
      ?.pipe(takeUntil(this.destroyed$), auditTime(300))
      .subscribe((value: FeedbackTypes) => {
        this.feedbackTypeOptions =
          value === FeedbackTypes.AudibleFeedback
            ? this.audibleOptions
            : this.visibleOptions;

        const newOptionForFeedback: IFeedbackTypeOption =
          value === FeedbackTypes.AudibleFeedback
            ? this.audibleOptions[0]
            : this.visibleOptions[0];
        this.formGroup?.controls?.feedbackOption?.setValue(
          newOptionForFeedback
        );

        this.formGroup?.updateValueAndValidity();
      });
  }

  private provideInitialFeedbackTypeOption(
    config: IConfiguration
  ): IFeedbackType | null {
    if (typeof config?.audibleFeedback === 'number') {
      return this.feedbackTypes?.find(
        (item: IFeedbackType) => item?.type === FeedbackTypes.AudibleFeedback
      );
    } else if (typeof config?.visibleFeedback === 'number') {
      return this.feedbackTypes?.find(
        (item: IFeedbackType) => item?.type === FeedbackTypes.VisibleFeedback
      );
    }

    return null;
  }

  private provideInitialOptionForFeedbackType(
    config: IConfiguration
  ): IFeedbackTypeOption | null {
    if (typeof config?.audibleFeedback === 'number') {
      return this.audibleOptions?.find(
        (item: IFeedbackTypeOption) => item?.enum === config?.audibleFeedback
      );
    } else if (typeof config?.visibleFeedback === 'number') {
      return this.visibleOptions?.find(
        (item: IFeedbackTypeOption) => item?.enum === config?.visibleFeedback
      );
    }

    return null;
  }

  private provideInitialOptionsForFeedback(
    config: IConfiguration
  ): IFeedbackTypeOption[] {
    if (typeof config?.audibleFeedback === 'number') {
      return this.audibleOptions;
    } else if (typeof config?.visibleFeedback === 'number') {
      return this.visibleOptions;
    }

    return [];
  }
}
