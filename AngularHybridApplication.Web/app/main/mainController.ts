import { StateService } from '@uirouter/core';

export default class MainController {
  static $inject = ['$state'];
  constructor(public $state: StateService) {
    this.$state = $state;
  }
}
