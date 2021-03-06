﻿import { IRequestConfig } from "angular";

export class OdataResource {
  protected resourcePath: string;
  constructor(private $http: ng.IHttpService) { }

  list(query: string = "") {
    return this.$http.get("/odata/" + this.resourcePath + query);
  }
  detail(id: string) {
    return this.$http.get("/odata/" + this.resourcePath + "(" + id + ")");
  }
  create(entity: IResource) {
    let req: IRequestConfig = { method: "POST", url: "/odata/" + this.resourcePath, data: entity, headers: { "Content-Type": "application/json" } };
    return this.$http(req);
  }
  protected save(entity: IResource) {
    let req: IRequestConfig = { method: "PATCH", url: "/odata/" + this.resourcePath + "(" + entity.Id + ")", data: entity, headers: { "Content-Type": "application/json" } };
    return this.$http(req);
  }
  delete(id: string) {
    return this.$http.delete("/odata/" + this.resourcePath + "(" + id + ")");
  }
}

export interface IResource {
  Id: any;
  _originalResource: any;
}