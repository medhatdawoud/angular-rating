(function () {
    "use strict";

    angular.module("angular-rating", []).component("rating", {
        template: "<span class=\"star glyphicon glyphicon-star\" ng-class=\"{'star-on':entry.filled}\" style=\"font-size:{{model.size}};\" ng-repeat=\"entry in model.stars track by $index\"></span>",
        bindings: {
            value: "<",
            max: "<",
            size: "@",
            color: "@"
        },
        transclude: true,
        controllerAs: "model",
        controller: function () {
            var model = this;

            if (!model.value) {
                if (model.value !== 0)
                    model.value = 1;
            }

            if (!model.size)
                model.size = '20px';

            if (!model.color)
                model.color = "#F3D82C";

            if (model.max == undefined) {
                model.max = 5;
            }

            model.stars = [];
            for (var i = 0; i < model.max; i++) {
                model.stars.push({
                    filled: i < model.value
                });
            }


            // the following is the insertion of styles into page onload
            var rating = {
                selector: 'rating',
                rules: [
                    'text-align: center',
                    'display: block',
                    'padding-bottom: 3px'
                ]
            }
            var star = {
                selector: '.star',
                rules: [
                    'font-size: 18px',
                    'color: #ddd'
                ]
            }
            var starOthers = {
                selector: '.star+.star',
                rules: [
                    'margin-left: 3px'
                ]
            }
            var starOn = {
                selector: '.star.star-on',
                rules: [
                    'color:' + model.color
                ]
            }

            var ratingCSS = rating.selector + '{' + rating.rules.join(';') + '}';
            var starCSS = star.selector + '{' + star.rules.join(';') + '}';
            var starOthersCSS = starOthers.selector + '{' + starOthers.rules.join(';') + '}';
            var starOnCSS = starOn.selector + '{' + starOn.rules.join(';') + '}';
            angular.element(document).find('head').prepend('<style type="text/css">' + ratingCSS + starCSS + starOthersCSS + starOnCSS + '</style>');

        }
    });

} ());