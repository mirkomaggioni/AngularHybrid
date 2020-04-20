import { StateService } from '@uirouter/core';
import { IResource } from '../shared/OdataResource';
import { PostsService } from './postsService';

export class PostsController {
  public Posts: Array<IResource>;

  static $inject = ['$state', 'postsService'];
  constructor(private $state: StateService, private postsService: PostsService) {
    var vm = this;
    this.postsService.list().then(function (result) {
      vm.Posts = result.data["value"];
    });
  }
  new() {
    this.$state.go("home.post", { id: null });
  }
  detail(id) {
    this.$state.go("home.post", { id: id });
  }
}
