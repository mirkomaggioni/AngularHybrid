import { OdataGenericResource } from '../shared/odataResourcesModule';

export class PostsService extends OdataGenericResource {
  constructor($http: ng.IHttpService) { super($http, 'Posts'); }
}