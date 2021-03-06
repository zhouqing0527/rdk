(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes', main];
    function main(scope, EventService, EventTypes) {
        scope.cityItems = [{
            label: "江苏省"
        }, {
            label: "浙江省"
        }, {
            label: "河南省"
        }, {
            label: "湖北省"
        }];

        scope.selectedItems = [{
            label: "江苏省"
        }];

        scope.rdkSelector = "Selector控件";

        scope.closeHandler = function(event, data) {
            var result = confirm('是否关闭Tab页');
            if(result) {
                rdk.tabID.destroyTab(data.tabIndex);
                // rdk.tabID.closeTab(data.tabIndex);
            }
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();