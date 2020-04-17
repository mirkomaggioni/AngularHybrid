import * as angular from 'angular';
import { PostsService } from './postsService';
import { PostsController } from './postsController';
import PostController from './postController';

export const postsModule = angular.module('postsModule', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.posts',
        {
          url: '/posts',
          templateUrl: 'app/main/posts/posts.html',
          controller: 'postsCtrl'
        })
      .state('home.post',
        {
          url: '/post/:id',
          templateUrl: 'app/main/posts/post.html',
          controller: 'postCtrl'
        });
  })
  .factory('postsService', PostsService)
  .controller('postsCtrl', PostsController)
  .controller('postCtrl', PostController);
