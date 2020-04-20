import { OdataGenericResource } from '../shared/odataResourcesModule';

export class BlogsService extends OdataGenericResource {
  static $inject = ['$http'];
  constructor($http: ng.IHttpService) { super($http, 'Blogs'); }
}