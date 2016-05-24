(function () {
    "use strict";

    angular.module("angular-rating", []).component("rating", {
        template: "<span class=\"star glyphicon glyphicon-star\" ng-class=\"{'star-on':entry.filled}\" style=\"font-size:{{model.size}};\" ng-repeat=\"entry in model.stars track by $index\"></span>",
        bindings: {
            value: "<",
            max: "<",
            size: "@"
        },
        transclude: true,
        controllerAs: "model",
        controller: function () {
            var model = this;

            if (!model.value) {
                if(model.value !== 0)
                    model.value = 1;
            }
            
            if (!model.size)
                model.size = '20px';

            if (model.max == undefined) {
                model.max = 5;
            }

            model.stars = [];
            for (var i = 0; i < model.max; i++) {
                model.stars.push({
                    filled: i < model.value
                });
            }
        }
    });

} ());