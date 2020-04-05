(function (window, angular) {
  'use-strict';
  angular.module('blogsModule', ['ui.router', 'odataResourcesModule'])
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
            controller: 'blogsDetailCtrl'
          });
    })
    .factory('blogsService', function (odataGenericResource) {
      return new odataGenericResource('odata', 'Blogs', 'Id');
    })
    .controller('blogsCtrl', function ($state, blogsService) {
      var vm = this;

      vm.new = function () {
        $state.go("home.blog", { id: null });
      };

      vm.detail = function (id) {
        $state.go("home.blog", { id: id });
      };

      vm.Blogs = blogsService.getOdataResource().query();
    })
    .controller('blogsDetailCtrl', function ($state, blogsService) {
      var vm = this;

      var load = function (id) {
        blogsService.get(id).then(function (data) {
          vm.Blog = data;
        });
      };

      vm.save = function () {
        blogsService.save(vm.Blog).then(function (data) {
          load(data.Id);
        });
      };

      vm.delete = function () {
        blogsService.delete(vm.Blog).then(function () {
          vm.close();
        });
      };

      vm.close = function () {
        $state.go("home.blogs");
      };

      load($state.params.id);
    });
})(window, window.angular);
