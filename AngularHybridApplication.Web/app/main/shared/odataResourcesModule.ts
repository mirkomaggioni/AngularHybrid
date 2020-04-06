import * as angular from "angular";
import { OdataResource, IResource } from './OdataResource';

class OdataGenericResource extends OdataResource {
  constructor($http: ng.IHttpService) { super($http); }

  getOdataResource(resourcePath: string) {
    this.resourcePath = resourcePath;
    return this;
  }

  get(id: string) {
    return this.detail(id);
  }

  save(resource: IResource) {
    if (!resource._originalResource) {
      return this.create(resource)
    } else if (this.isChanged(resource)) {
      var object = this.getObjectToUpdate(resource);
      return this.save(object);
    }
  }

  delete(id: string) {
    return this.delete(id);
  }

  isChanged(resource: IResource) {
    var isChanged = false;
    for (var propertyName in resource) {
      if (this.isEntityProperty(propertyName) && resource._originalResource[propertyName] !== resource[propertyName]) {
        isChanged = true;
      }
    }

    return isChanged;
  };

  private isEntityProperty(propertyName: string) {
    return (propertyName !== '$promise' && propertyName !== '_originalResource');
  }


  private getObjectToUpdate(resource: IResource) {
    var object = new object();
    object['Id'] = resource.Id;

    for (var propertyName in resource) {
      if (this.isEntityProperty(propertyName) && resource._originalResource[propertyName] !== resource[propertyName]) {
        object[propertyName] = resource[propertyName];
      }
    }

    return object;
  };
}

export const serviziModule = angular.module('odataResourcesModule', ['ui.router'])
  .factory('odataGenericResource', OdataGenericResource);
