import { StateService } from '@uirouter/core';

export default class MainController {
  constructor(public $state: StateService) {
    this.$state = $state;
  }
}
