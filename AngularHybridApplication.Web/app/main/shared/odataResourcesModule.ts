import { OdataResource, IResource } from './OdataResource';

export class OdataGenericResource extends OdataResource {
  resourcePath: string;
  constructor($http: ng.IHttpService, resourcePath: string) {
    super($http);
    this.resourcePath = resourcePath;
  }

  save(resource: IResource) {
    if (!resource._originalResource) {
      return this.create(resource)
    } else if (this.isChanged(resource)) {
      var object = this.getObjectToUpdate(resource);
      return this.save(object);
    }
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
