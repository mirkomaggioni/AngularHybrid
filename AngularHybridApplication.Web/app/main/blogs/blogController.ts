import { StateService, StateParams } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { BlogsService } from './blogsService';

export default class BlogController {
  public Blog: IResource;

  static $inject = ['$state', '$stateParams', 'blogsService'];
  constructor(private $state: StateService, private $stateParams: StateParams, private blogsService: BlogsService) {
    var vm = this;
    if ($stateParams.id === '') {
      vm.Blog = <IResource>{};
    } else {
      blogsService.detail($stateParams.id).then(function (result) {
        vm.Blog = result.data as IResource;
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
