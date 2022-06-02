/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { auditTime } from 'rxjs/operators';

import { Configuration, IConfiguration } from 'src/assets/proto/configuration';

enum FeedbackTypes {
  AudibleFeedback = 1,
  VisibleFeedback,
}

interface IFeedbackType {
  enum: FeedbackTypes;
  title: string;
}

interface IFeedbackTypeOption {
  enum: number;
  title: string;
}

@Component({
  selector: 'app-config-settings-form',
  templateUrl: './config-settings-form.component.html',
  styleUrls: ['./config-settings-form.component.scss'],
})
export class ConfigSettingsFormComponent implements OnInit {
  @Output() formValueChanged: EventEmitter<IConfiguration> =
    new EventEmitter<IConfiguration>();

  @Input() set itemConfig(config: IConfiguration) {
    this.setupForm(config);
  }

  public formGroup!: FormGroup;

  public initialFeedbackTypeValue: FeedbackTypes =
    FeedbackTypes.VisibleFeedback;
  public feedbackTypes: IFeedbackType[] = [
    {
      enum: FeedbackTypes.AudibleFeedback,
      title: 'Audible',
    },
    {
      enum: FeedbackTypes.VisibleFeedback,
      title: 'Visible',
    },
  ];

  public audibleFeedbackTypes: IFeedbackTypeOption[] = [
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

  public visibleFeedbackTypes: IFeedbackTypeOption[] = [
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

  public selectedFeedbackOption!: IFeedbackTypeOption;
  public feedbackTypeOptions!: IFeedbackTypeOption[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  public get selectedFeedbackOptionValue(): number {
    return this.selectedFeedbackOption?.enum;
  }

  public setupForm(config: IConfiguration): void {
    this.formGroup?.reset();

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
      audibleFeedback: new FormControl(config?.audibleFeedback || null),
      visibleFeedback: new FormControl(config?.visibleFeedback || null),
    });

    this.formGroup?.valueChanges
      ?.pipe(auditTime(300))
      .subscribe((formValues: IConfiguration) => {
        this.formValueChanged?.emit(formValues);
      });

    this.handleFeedbackTypeChange(FeedbackTypes.VisibleFeedback);
  }

  public onFeedbackTypeChanged(event: Event): void {
    const selectedFeedbackType: any = (event as CustomEvent)?.detail?.value;
    this.handleFeedbackTypeChange(selectedFeedbackType);
  }

  public onFeedbackTypeOptionChanged(event: Event): void {
    const selectedFeedbackTypeOption: any = (event as CustomEvent)?.detail
      ?.value;
  }

  private handleFeedbackTypeChange(selectedType: FeedbackTypes): void {
    if (selectedType === FeedbackTypes.AudibleFeedback) {
      this.formGroup?.controls?.visibleFeedback?.setValue(null);
      this.feedbackTypeOptions = this.audibleFeedbackTypes;
      this.selectedFeedbackOption = this.audibleFeedbackTypes[0];
    } else if (selectedType === FeedbackTypes.VisibleFeedback) {
      this.formGroup?.controls?.visibleFeedback?.setValue(null);
      this.feedbackTypeOptions = this.visibleFeedbackTypes;
      this.selectedFeedbackOption = this.visibleFeedbackTypes[0];
    }

    this.formGroup?.updateValueAndValidity();
  }
}
