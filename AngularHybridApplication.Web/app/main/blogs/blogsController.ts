import { StateService } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { BlogsService } from './blogsService';

export class BlogsController {
  public Blogs: Array<IResource>;

  constructor(private $state: StateService, private blogsService: BlogsService) {
    this.blogsService.list().then(function (result) {
      this.Blogs = result.data;
    });
  }
  new() {
    this.$state.go("home.blog", { id: null });
  }
  detail(id) {
    this.$state.go("home.blog", { id: id });
  }
}
