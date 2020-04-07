import { StateService } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { PostsService } from './postsService';

export class PostsController {
  public Posts: Array<IResource>;

  constructor(private $state: StateService, private postsService: PostsService) {
    this.postsService.list().then(function (result) {
      this.Posts = result.data;
    });
  }
  new() {
    this.$state.go("home.post", { id: null });
  }
  detail(id) {
    this.$state.go("home.post", { id: id });
  }
}
