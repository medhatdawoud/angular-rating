(function () {
    "use strict";

    angular.module("angular-rating", []).component("rating", {
        template: `<span class="star glyphicon glyphicon-star" ng-class="{'star-on':entry.filled}"                     
                    ng-mouseover="model.fillStarHandler($index)"
                    ng-mouseleave="model.unfillStarHandler($index)"
                    style="font-size:{{model.size}};" ng-repeat="entry in model.stars track by $index"></span>`,
        bindings: {
            value: "<",
            max: "<",
            size: "@",
            color: "@",
            interactive: "@"
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

            model.fillStarHandler = function (starIndex) {
                if (model.interactive.toLowerCase() == "true") {
                    setValue(starIndex + 1);
                    for (var i = starIndex; i >= 0; i--) {
                        fillStar(i);
                    }
                    for (var i = starIndex + 1; i <= model.max - 1; i++) {
                        UnfillStar(i);
                    }
                }
            }

            model.unfillStarHandler = function (starIndex) {
                if (model.interactive.toLowerCase() == "true") {
                    if (starIndex == 0) {
                        UnfillStar(starIndex);
                        // set value to 0 means no stars was selected.
                        setValue(0);
                    }
                }
            }

            function fillStar(s) {
                model.stars[s].filled = true;
            }

            function UnfillStar(s) {
                model.stars[s].filled = false;
            }

            function setValue(val) {
                model.value = val;
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