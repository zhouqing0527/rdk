(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table','rd.controls.Button','css!base/css/simple_tab4','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.setting = {
            "columnDefs" :[
                {
                    title : "详单",

                    render : '<i class="iconfont iconfont-e8b7"></i>'
                },
                {
                    title : "得分趋势",
                    render : '<i class="iconfont iconfont-e8c8"></i>'
                }
            ]
        }
        scope.clickHandler = function(){
            alert('导出接口')
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