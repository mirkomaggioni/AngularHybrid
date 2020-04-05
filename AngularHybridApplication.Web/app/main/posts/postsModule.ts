(function (window, angular) {
  'use-strict';
  angular.module('postsModule', ['ui.router', 'blogsModule', 'uiModule', 'odataResourcesModule'])
    .config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider.state('home.posts',
          {
            url: '/posts',
            templateUrl: 'app/main/posts/posts.html',
            controller: 'postsCtrl'
          })
          .state('home.post',
            {
              url: '/post/:id',
              templateUrl: 'app/main/posts/post.html',
              controller: 'postsDetailCtrl'
            });
      }
    ])
    .factory('postsService', function (odataGenericResource) {
      return new odataGenericResource('odata', 'Posts', 'Id');
    })
    .controller('postsCtrl', function ($state, postsService) {
      var vm = this;

      vm.new = function () {
        $state.go("home.post", { id: null });
      };

      vm.detail = function (id) {
        $state.go("home.post", { id: id });
      };

      vm.Posts = postsService.getOdataResource().query();
    })
    .controller('postsDetailCtrl', function ($state, postsService, blogsService) {
      var vm = this;

      var load = function (id) {
        vm.Blogs = blogsService.getOdataResource().query();

        postsService.get(id).then(function (data) {
          vm.Post = data;
        });
      };

      vm.save = function () {
        postsService.save(vm.Post).then(function (data) {
          load(data.Id);
        });
      };

      vm.delete = function () {
        blogsService.delete(vm.Post).then(function () {
          vm.close();
        });
      };

      vm.close = function () {
        $state.go("home.posts");
      };

      load($state.params.id);
    });
})(window, window.angular);