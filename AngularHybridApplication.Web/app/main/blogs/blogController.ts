import { StateService, StateParams } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { BlogsService } from './blogsService';

export default class BlogController {
  public Blog: IResource;

  constructor(private $state: StateService, private $stateParams: StateParams, private blogsService: BlogsService) {
    if ($stateParams.id === '') {
      this.Blog = <IResource>{};
    } else {
      blogsService.detail($stateParams.id).then(function (result) {
        this.Blog = result.data;
      });
    }
  }
  save() {
    if (this.Blog.Id === undefined) {
      this.blogsService.create(this.Blog).then(function (result) {
        this.Blog = result.data;
      });
    } else {
      this.blogsService.save(this.Blog).then(function () { });
    }
  }
  delete() {
    this.blogsService.delete(this.Blog.Id).then(function () {
      this.$state.go("home.blogs");
    });
  }
  close() {
    this.$state.go("home.blogs");
  }
}
