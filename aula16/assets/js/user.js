angular.module('User', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'views/users-list.html',
        controller: 'UserController',
        controllerAs: 'User'
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
  .controller('UserEditController', UserEditController);

function UserController() {
  var vm = this;
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

function UserDetailsController($routeParams) {
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
