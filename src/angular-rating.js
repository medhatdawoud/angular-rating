(function () {
    "use strict";

    angular.module("angular-rating", []).component("rating", {
        template: `<span class="star glyphicon glyphicon-star" ng-class="{'star-on':entry.filled}"                     
                    ng-mouseover="model.fillStarHandler($index)"
                    ng-mouseleave="model.unfillStarHandler($index)"
                    ng-click="model.selectStar($index)"                    
                    style="font-size:{{model.size}};" ng-repeat="entry in model.stars track by $index"></span>
                    <br />
                    <div>{{model.value}}</div>`,
        bindings: {
            value: "<",
            max: "<",
            size: "@",
            color: "@",
            interactive: "@"
        },
        transclude: true,
        controllerAs: "model",
        controller: function ($timeout) {
            var model = this;
            model.originalValue = -1;
            if(isInteractive()){
                model.value=-1;
            }
            var eventQueue = {
                type: '',
                index: -1,
                action: null,
                process: function (_type, _index) {
                    this.type = _type;
                    this.index = _index;
                    if (this.type === 0) { //unfill
                        var _event = this;
                        if (isDirty()) {
                            console.log('isDirty, model.originalValue :' + model.originalValue + ', model.value :' + model.value);
                            return;
                        }
                        this.action = $timeout(function () {
                            if (_event.index == 0) {
                                UnfillStar(_event.index);
                                console.log('=================================================');
                            }
                        }, 100);
                    } else if (this.type === 1) { // fill
                        if (this.action) {
                            $timeout.cancel(this.action);
                        }

                        for (var i = this.index; i >= 0; i--) {
                            fillStar(i);
                        }
                        for (var i = this.index + 1; i <= model.max - 1; i++) {
                            UnfillStar(i);
                        }
                        console.log('=================================================');
                    }
                }
            };

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
                if (isInteractive()) {
                    eventQueue.process(1, starIndex);
                }
            }

            model.unfillStarHandler = function (starIndex) {
                if (isInteractive()) {
                    eventQueue.process(0, starIndex);
                }
            }

            model.selectStar = function (starIndex) {
                setValue(starIndex + 1);
            }

            function isDirty() {
                return model.originalValue !== model.value;
            }

            function isInteractive() {
                return model.interactive.toLowerCase() == "true"
            }

            function fillStar(s) {
                model.stars[s].filled = true;
                console.log('fill: ' + s);
            }

            function UnfillStar(s) {
                model.stars[s].filled = false;
                console.log('unfill: ' + s);
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