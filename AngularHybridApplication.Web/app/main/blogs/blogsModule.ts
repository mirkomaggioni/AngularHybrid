import * as angular from 'angular';
import { BlogsService } from './blogsService';
import { BlogsController } from './blogsController';
import BlogController from './blogController';

export const blogsModule = angular.module('blogsModule', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home.blogs',
        {
          url: '/blogs',
          templateUrl: 'app/main/blogs/blogs.html',
          controller: 'blogsCtrl'
        })
      .state('home.blog',
        {
          url: '/blog/:id',
          templateUrl: 'app/main/blogs/blog.html',
          controller: 'blogCtrl'
        });
  })
  .factory('blogsService', BlogsService)
  .controller('blogsCtrl', BlogsController)
  .controller('blogCtrl', BlogController);
