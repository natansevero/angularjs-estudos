angular.module('User', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'views/users-list.html',
        controller: 'UserController',
        controllerAs: 'User'
      })
      .when('/users/create', {
        templateUrl: 'views/users-create.html',
        controller: 'UserController',
        controllerAs: 'User'
      })
      .when('/users/github', {
        templateUrl: 'views/users-github.html',
        controller: 'UserGithubController',
        controllerAs: 'UserGithub'
      })
      .when('/users/:id', {
        templateUrl: 'views/users-details.html',
        controller: 'UserDetailsController',
        controllerAs: 'UserDetails'
      })
      .when('/users/:id/edit', {
        templateUrl: 'views/users-edit.html',
        controller: 'UserEditController',
        controllerAs: 'UserEdit'
      })
  }])
  .controller('UserController', UserController)
  .controller('UserDetailsController', UserDetailsController)
  .controller('UserEditController', UserEditController)
  .controller('UserGithubController', UserGithubController);

function UserController($http) {
  var vm = this;
  vm.users = [];
  vm.aditing = false;
  vm.reverse = false;
  vm.getTituloStyle = function() { return "atom-titulo"; };

  const url = 'http://localhost:3000/api/users/retrieve';
  const method = 'GET';
  $http({
    url: url,
    method: method
  })
  .then(function(response) {
    console.log("Response:", response);
    vm.users = response.data;
  }, function(err) {
    console.log("Error:", err);
  })

  // function getKeyLength(){
  //   return Object.keys(angular.copy(vm.users[0])).length;
  // }
  // vm.keysLength = getKeyLength();

  vm.add = add;
  function add(user) {
    console.log('user', user);
    vm.users.push(angular.copy(user));
    vm.form = {};
  }

  vm.remove = removeByEmail;
  function removeByEmail(users){
    vm.users = users.filter((el) => { return !el.selecionado })
  }

  vm.edit = edit;
  function edit(user, index){
    vm.form = angular.copy(user);
    vm.form.index = index;
    vm.editing = true;
  }

  vm.save = save;
  function save(user){
    var users = vm.users.map((el, i) => {
      if(i === user.index) {
        delete user.index;
        return user;
      }
      return el;
    });
    vm.users = angular.copy(users);
    vm.editing = false;
    vm.form = {};
  }

  vm.orderByName = orderByName;
  function orderByName() {
    vm.predicate = 'name';
    vm.reverse = !vm.reverse;
  }

  vm.orderByEmail = orderByEmail;
  function orderByEmail() {
    vm.predicate = 'email';
    vm.reverse = !vm.reverse;
  }

  vm.submitForm = submitForm;
  function submitForm(user) {
    console.log('submitForm:', user);
    const url = 'http://localhost:3000/api/users/create';
    const method = 'POST';
    $http({
      url: url,
      method: method,
      data: user
    })
    .then(function(response) {
      console.log("Response:", response);
      //vm.users.push(response.data);
    }, function(err) {
      console.log("Error:", err);
    })
    // add(user);
  }
}
UserController.$inject = ['$http'];

function UserDetailsController($http, $routeParams) {
  var vm = this;
  vm.routeParams = $routeParams;
  vm.aditing = false;
  vm.reverse = false;
  vm.users = [];

  const url = `http://localhost:3000/api/users/get?_id=${$routeParams.id}`;
  const method = 'GET';
  $http({
    url: url,
    method: method
  })
  .then(function(response) {
    console.log("Data:", response);
    vm.user = response.data;
  }, function(err) {
    console.log("Error:", err);
  })
}
UserDetailsController.$inject = ['$http', '$routeParams'];

function UserEditController($routeParams) {
  var vm = this;
  vm.routeParams = $routeParams;
  vm.aditing = false;
  vm.reverse = false;
  vm.getTituloStyle = function() { return "atom-titulo"; };
  vm.users = [
    {name: 'Suissa', email: 'suissera@manoveio.com', type: 'teacher', active: true}
  , {name: 'João', email: 'joao@macioesedoso.com', type: 'student', active: false}
  , {name: 'Franciele', email: 'fran@quimica.com', type: 'teacher', active: false}
  , {name: 'Maria', email: 'm@gmail.com', type: 'student', active: true}
  , {name: 'José', email: 'js@gmail.com', type: 'student', active: true}
  ];
  function getKeyLength(){
    return Object.keys(angular.copy(vm.users[0])).length;
  }
  vm.keysLength = getKeyLength();

  vm.add = add;
  function add(user) {
    console.log('user', user);
    vm.users.push(angular.copy(user));
    vm.form = {};
  }

  vm.remove = removeByEmail;
  function removeByEmail(users){
    vm.users = users.filter((el) => { return !el.selecionado })
  }

  vm.edit = edit;
  function edit(user, index){
    vm.form = angular.copy(user);
    vm.form.index = index;
    vm.editing = true;
  }

  vm.save = save;
  function save(user){
    var users = vm.users.map((el, i) => {
      if(i === user.index) {
        delete user.index;
        return user;
      }
      return el;
    });
    vm.users = angular.copy(users);
    vm.editing = false;
    vm.form = {};
  }

  vm.orderByName = orderByName;
  function orderByName() {
    vm.predicate = 'name';
    vm.reverse = !vm.reverse;
  }

  vm.orderByEmail = orderByEmail;
  function orderByEmail() {
    vm.predicate = 'email';
    vm.reverse = !vm.reverse;
  }

  vm.submitForm = submitForm;
  function submitForm(user) {
    add(user);
  }
}

function UserGithubController($http) {
  var vm = this;

  const user = 'natansevero';
  const url = `https://api.github.com/users/${user}`;
  const method = 'GET';
  $http({
    url: url,
    method: method
  })
  .then(function(response) {
    console.log("Data:", response);
    vm.user = response.data;
  }, function(err) {
    console.log("Error:", err);
  })
}
UserGithubController.$inject = ['$http'];
