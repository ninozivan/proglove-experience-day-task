/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuration, IConfiguration } from 'src/assets/proto/configuration';
import { IConfigListItem } from '../context/global.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private listOfConfig: IConfigListItem[] = [
    {
      uid: '1584133845131',
      timeout: 700,
      deviceName: 'Device 1',
      audibleFeedback: Configuration.AudibleFeedback.BEEP_BEEP,
      visibleFeedback: null,
    },
    {
      uid: '1684644165312',
      timeout: 300,
      deviceName: 'Device 2',
      audibleFeedback: null,
      visibleFeedback: Configuration.VisibleFeedback.GREEN,
    },
    {
      uid: '58913998777',
      timeout: 100,
      deviceName: 'Device 3',
      audibleFeedback: Configuration.AudibleFeedback.BEEP,
      visibleFeedback: null,
    },
    {
      uid: '16872348766877',
      timeout: 600,
      deviceName: 'Device 4',
      audibleFeedback: null,
      visibleFeedback: Configuration.VisibleFeedback.RED,
    },
  ];

  public listOfConfigs$: BehaviorSubject<IConfigListItem[]> =
    new BehaviorSubject(this.listOfConfig);

  constructor() {}

  public getConfigs(): IConfiguration[] {
    return this.listOfConfig;
  }

  public observeListOfConfigs(): Observable<IConfiguration[]> {
    return this.listOfConfigs$.asObservable();
  }

  public updateConfig(listItem: IConfigListItem): void {
    const itemIndex: number = this.listOfConfig?.findIndex(
      (item: IConfigListItem) => item.uid === listItem.uid
    );

    if (itemIndex < 0) {
      return;
    }

    this.listOfConfig[itemIndex] = listItem;

    this.listOfConfigs$.next(this.listOfConfig);
  }

  public createNewConfig(listItem: IConfigListItem): void {
    this.listOfConfig.push(listItem);
    this.listOfConfigs$.next(this.listOfConfig);
  }
}
