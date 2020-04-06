import { OdataGenericResource } from '../shared/odataResourcesModule';

export class BlogsService extends OdataGenericResource {
  constructor($http: ng.IHttpService) { super($http, 'Blogs'); }
}