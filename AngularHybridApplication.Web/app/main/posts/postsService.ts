import { OdataGenericResource } from '../shared/odataResourcesModule';

export class PostsService extends OdataGenericResource { 
  static $inject = ['$http'];
  constructor($http: ng.IHttpService) { super($http, 'Posts'); }
}