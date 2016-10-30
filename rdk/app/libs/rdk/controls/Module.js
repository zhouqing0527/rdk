define(['rd.core'], function() {
    var tabApp = angular.module("rd.controls.Module", ['rd.core']);
    tabApp.directive('rdkModule', ['EventService', 'EventTypes', 'Utils', '$compile', '$controller', '$http',
        function(EventService, EventTypes, Utils, $compile, $controller, $http) {
            return {
                restrict: 'E',
                scope: {
                    id: '@?',
                    url: '@?',
                    controller: '@?',
                    loadOnReady: '@?',
                    initData: '=?',
                    loadTimeout: '@?'
                },
                replace: true,
                template: '<div></div>',
                controller: ['$scope', function(scope) {
                    Utils.publish(scope.id, this);
                }],
                link: function(scope, element, attrs) {
                    scope.url = Utils.getValue(scope.url, attrs.url, '');
                    scope.controller = Utils.getValue(scope.controller, attrs.controller, '');
                    scope.loadOnReady = Utils.isTrue(attrs.loadOnReady, true);
                    scope.loadTimeout = Utils.getValue(scope.loadTimeout, attrs.loadTimeout, 10000);
                    
                    scope.loadContext = undefined;
                    scope.load = _load;

                    if (scope.loadOnReady) {
                        _load(scope.url, scope.controller, scope.initData, scope.loadTimeout);
                    }

                    function _load(url, controller, initData, timeout) {
                        if (scope.loadContext !== undefined) {
                            console.warn('module has been loaded or being loading!');
                            return;
                        }

                        if (!url) {
                            console.warn('invalid module url')
                            return;
                        }

                        $http.get(url, {timeout: timeout}).success(_compileModule).error(_loadError);
                        scope.loadContext = {controller: controller, initData: initData};
                    }

                    function _compileModule(htmlSource) {
                        var html = $(htmlSource);
                        if (!html[0]) {
                            console.error('invalid module template, url=' + url);
                            return;
                        }
                        var loadContext = scope.loadContext;
                        scope.loadContext = null;

                        var id = Utils.createUniqueId('module_');
                        html.attr('id', id);
                        element.append(html);

                        var moduleScope;
                        var appScope = Utils.findAppScope(scope);
                        var ctrl = loadContext.controller;
                        var initData = loadContext.initData;
                        ctrl = ctrl ? ctrl : html.attr('controller');
                        if(ctrl) {
                            moduleScope = appScope.$new();
                            //实例化一个控制器
                            $controller(ctrl, {$scope: moduleScope});
                            if (angular.isObject(initData)) {
                                Utils.shallowCopy(initData, moduleScope);
                            } else {
                                moduleScope.initData = initData;
                            }
                            moduleScope.$moduleId = scope.id ? scope.id : id;
                        } else {
                            if (initData) {
                                //采用了全局控制器，定义了的initData会被忽略，给个提示
                                console.warn('ignoring initData because this module has no controller.')
                            }
                            moduleScope = appScope;
                        }

                        $compile($('#' + id))(moduleScope);
                        moduleScope.$emit(EventTypes.READY);
                    }

                    function _loadError(data, status, headers, config) {
                        console.error('load module error(status=' + status + '), url=' + config.url);
                    }
                }
            }
        }
    ]);
});
