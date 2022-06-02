import { IConfiguration } from 'src/assets/proto/configuration';

export interface IConfigListItem extends IConfiguration {
  uid?: string;
}
