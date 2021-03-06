(function() {
    'use strict';

    /**
     * Display relative date in <time> element
     *
     * Usage:
     * <span sd-reldate-complex data-useutc="false" ng-model="user._created"></span>
     *
     * Params:
     * @param {object} ngModel - datetime string in utc
     * @param {boolean} useutc - if true vlues are converted to local datetime
     */
    ReldateComplex.$inject = ['config'];
    function ReldateComplex(config) {
        var COMPARE_FORMAT = config.model.dateformat;
        var DATE_FORMAT = config.view.dateformat || config.model.dateformat;
        var TIME_FORMAT = config.view.timeformat || config.model.timeformat;
        var DISPLAY_DATE_FORMAT = DATE_FORMAT + ' ' + TIME_FORMAT;
        var DISPLAY_DAY_FORMAT = 'dddd, ';
        var DISPLAY_TODAY_FORMAT = '[Today], ';
        return {
            scope: {
                useutc: '='
            },
            require: 'ngModel',
            template: '<time datetime="{{ datetime }}">' +
                '<span>{{ rday }}{{ rdate }}</span></time>',
            replate: true,
            link: function(scope, element, attrs, ngModel) {

                if (angular.isUndefined(scope.useutc)) {
                    scope.useutc = true;
                }

                ngModel.$render = function() {
                    var date = moment.utc(ngModel.$viewValue);
                    scope.datetime = date.toISOString();

                    if (scope.useutc) {
                        date.local(); // switch to local time zone
                    }

                    if (moment().format(COMPARE_FORMAT) === date.format(COMPARE_FORMAT)){
                        scope.rday = date.format(DISPLAY_TODAY_FORMAT);
                    } else {
                        scope.rday = date.format(DISPLAY_DAY_FORMAT);
                    }

                    scope.rdate = date.format(DISPLAY_DATE_FORMAT);
                };
            }
        };
    }

    angular.module('superdesk.datetime.reldatecomplex', []).directive('sdReldateComplex', ReldateComplex);

})();
