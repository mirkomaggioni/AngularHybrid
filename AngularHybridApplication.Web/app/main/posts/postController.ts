import { StateService, StateParams } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { PostsService } from './postsService';
import { BlogsService } from '../blogs/blogsService';

export default class PostController {
  public Blogs: Array<IResource>;
  public Post: IResource;

  constructor(private $state: StateService, private $stateParams: StateParams, private postsService: PostsService, private blogsService: BlogsService) {
    blogsService.list().then(function (result) {
      this.Blogs = result.data;
    });

    if ($stateParams.id === '') {
      this.Post = <IResource>{};
    } else {
      postsService.detail($stateParams.id).then(function (result) {
        this.Post = result.data;
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
