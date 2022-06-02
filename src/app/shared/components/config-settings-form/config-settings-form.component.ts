/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IConfiguration } from 'src/assets/proto/configuration';

@Component({
  selector: 'app-config-settings-form',
  templateUrl: './config-settings-form.component.html',
  styleUrls: ['./config-settings-form.component.scss'],
})
export class ConfigSettingsFormComponent implements OnInit {
  @Input() set itemConfig(config: IConfiguration) {
    this.setupForm(config);
  }

  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

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
  }
}
