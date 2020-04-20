import { StateService, StateParams } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { PostsService } from './postsService';
import { BlogsService } from '../blogs/blogsService';

export default class PostController {
  public Blogs: Array<IResource>;
  public Post: IResource;

  static $inject = ['$state', '$stateParams', 'postsService', 'blogsService'];
  constructor(private $state: StateService, private $stateParams: StateParams, private postsService: PostsService, private blogsService: BlogsService) {
    var vm = this;
    blogsService.list().then(function (result) {
      vm.Blogs = result.data["value"];
    });

    if ($stateParams.id === '') {
      vm.Post = <IResource>{};
    } else {
      postsService.detail($stateParams.id).then(function (result) {
        vm.Post = result.data as IResource;
      });
    }
  }
  save() {
    if (this.Post.Id === undefined) {
      this.postsService.create(this.Post).then(function (result) {
        this.Post = result.data;
      });
    } else {
      this.postsService.save(this.Post).then(function () { });
    }
  }
  delete() {
    this.postsService.delete(this.Post.Id).then(function () {
      this.$state.go("home.posts");
    });
  }
  close() {
    this.$state.go("home.posts");
  }
}
