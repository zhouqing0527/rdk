(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module', 'base/template/sample_module'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        // 注意到module2在定义的时候，没有给initData属性，因此module2在访问data属性的时候，
        // 实际上是使用了这里的data属性。这是因为这个data属性被定义在所有module的父控制器中。
        // 相反的，module1由于通过initData自定义了一个data属性，RDK会优先读取自子控制器中的
        // data属性的值。
        // 这个过程和OOP的继承非常类似。
        scope.data = 'defined in the root controller';

        scope.hello = function() {
            //访问SampleModule中的数据。
            //每个模块都有一个child属性，值是当前模块所绑定的控制器一个实例。
            //如果当前模块未绑定控制器，则child属性的值为null
            console.log(rdk.module1.child.someData);

            //调用SampleModule中的方法
            rdk.module1.child.hello('module1');
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