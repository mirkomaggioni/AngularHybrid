import * as angular from 'angular';
import { mainModule } from './main/mainModule';
import { blogsModule } from './main/blogs/blogsModule';
import { postsModule } from './main/posts/postsModule';
import { uiModule } from './main/shared/uiModule';

export default angular.module('app', ['ui.router', mainModule.name, blogsModule.name, postsModule.name, uiModule.name])
  .config(function ($urlRouterProvider, $locationProvider) {
    console.log("Angularjs Module Launch");
    $urlRouterProvider.otherwise('/home/blogs');
    $locationProvider.hashPrefix('');
  }).name;
