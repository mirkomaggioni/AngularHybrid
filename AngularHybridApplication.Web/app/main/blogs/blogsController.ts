import { StateService } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { BlogsService } from './blogsService';

export class BlogsController {
  public Blogs: Array<IResource>;

  constructor(private $state: StateService, private blogsService: BlogsService, private $http: ng.IHttpService) {
    var vm = this;
    this.blogsService.list().then(function (result) {
      vm.Blogs = result.data["value"];
    });
  }
  new() {
    this.$state.go("home.blog", { id: null });
  }
  detail(id) {
    this.$state.go("home.blog", { id: id });
  }
}
