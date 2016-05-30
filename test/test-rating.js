(function () {
    "use strict";

    angular.module('testRating', ['angular-rating'])
        .controller('testController', function($scope){
            $scope.value = 2;
        });

})();