app.directive('menuTop', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/menus/menu-top.html',
    }
});

app.directive('topBar', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/top/top-bar.html',
    }
});

app.directive('topBreadcrumb', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/top/top-breadcrumb.html',
    }
});

app.directive('pageFooter', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'directives/footer/page-footer.html',
    }
});

app.directive('nextFocus', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    e.preventDefault();
                    try {
                        if (attrs.tabindex !== undefined) {
                            var currentTabeIndex = attrs.tabindex;
                            var nextTabIndex = parseInt(currentTabeIndex) + 1;
                            var elems = document.querySelectorAll("[tabindex]");
                            for (var i = 0, len = elems.length; i < len; i++) {
                                var el = angular.element(elems[i]);
                                var idx = parseInt(el.attr('tabindex'));
                                if (idx === nextTabIndex) {
                                    elems[i].focus();
                                    break;
                                }
                            }
                        }
                    } catch (e) {
                        console.log('Focus error: ' + e);
                    }
                }
            });
        }
    };
}]);

app.directive('formateDate', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('keydown', function (e) {
                var k = e.keyCode;

                if (
                  k != 8 &&
                  k != 9 &&
                  k != 13 &&
                  ((k < 48 || k > 105) || (k > 57 && k < 96))
                ) {
                    e.preventDefault();
                }
            });
            element.on('keyup', function (e) {
                var v = element.val();
                var k = e.keyCode;

                if (k == 8 && (v.length == 3 || v.length == 6)) {
                    scope.$apply(function () {
                        element.val(v.slice(0, -1));
                    });
                }
                else if (v.length == 2 || v.length == 5) {
                    scope.$apply(function () {
                        element.val(v + "/");
                    });
                }
            });
        }
    }
});

app.filter('docFormat', function () {
    return function (doc) {
        if (doc != undefined) {
            if (doc.length == 14) {
                return doc.substr(0, 2) + '.' + doc.substr(3, 3) + '.' + doc.substr(5, 3) + '/' + doc.substr(8, 4) + '-' + doc.substr(12, 2);
            } else {
                return doc.substr(0, 3) + '.' + doc.substr(3, 3) + '.' + doc.substr(6, 3) + '-' + doc.substr(9, 2);
            }
        };

        return doc;
    };
});

app.filter('telFormat', function () {
    return function (tel) {
        if (tel != undefined) {
            if (tel.length == 11) {
                return '(' + tel.substr(0, 2) + ')' + tel.substr(2, 5) + '-' + tel.substr(7, 4);
            }
            if (tel.length == 10) {
                return '(' + tel.substr(0, 2) + ')' + tel.substr(2, 4) + '-' + tel.substr(6, 4);
            }
        }

        return tel;
    };
});

app.directive('numberChar', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == null)
                    return ''
                cleanInputValue = inputValue.replace(/[^\d]/g, '');
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
});

// Directive for generic chart, pass in chart options
app.directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
});

// Directive for pie charts, pass in title and data only    
app.directive('hcPieChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: scope.title
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: scope.data
                }]
            });
        }
    };
});