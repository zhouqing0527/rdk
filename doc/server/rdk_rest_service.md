### rdk_server rest请求说明

rdk可支持 get/put/delete/put 四种动作rest服务。

#### get 请求
url格式：

	http://ip:port/rdk/service/js服务脚本相对路径?app=应用名&p1=v1&p2=v2&...

- js服务脚本相对路径：即需要请求的js服务脚本路径，该路径与服务脚本相对app目录所在路径一致，比如 `http://ip:port/rdk/service/app/server/my_service`，文件的扩展名可选。
- app：应用标志，可选，该参数用于rdk区分各个应用。
- p1=v1：需要传递给后端rest服务的参数

返回：被请求的服务脚本对应的返回值。

示例：

请求本机`app/server/my_service`服务：

	//需要进行url编码
	http://localhost:5812/rdk/service/app/example/server/my_service?param1={"a":"A"}&param2=aaa&param3='bbb'&app=example

这样在my_service服务中即可以request对象获取该参数值。

my_service服务:

	(function() {

		return function(request, script) {
			//直接将前端传递过来的参数打印到日志中。
			log(request);   // {"param1":{"a":"A"},"param2":"aaa","param3":"'bbb'","app":"example"}
			log(request.param1.a); // "A"
			log(request.param2); // "aaa"
			return request;
		}

	})();

#### post/put/delete 请求
url格式：

			 http://ip:port/rdk/service/js服务脚本相对路径

js服务脚本相对路径：即需要请求的js服务脚本路径，该路径与服务脚本相对app目录所在路径一致，比如 `http://ip:port/rdk/service/app/server/my_service`，文件的扩展名可选。

调用这个rest服务的参数必须放在body中，参数格式任意。**注意**：如果给的参数是一个json格式字符串，则此json的app和param这2个属性被rdk保留，请勿占用。

返回：被请求的服务脚本对应的返回值。

**示例一**

请求url

	http://localhost:5812/rdk/service/app/example/server/my_service

body中参数为：

	{
		k1: 'v1', k2: 'v2'
	}

my_service服务:

	(function() {
	
		function _post(request, script) {
			log(request.k1); // "v1"
			log(request.k2); // "v2"
			return "rdk";
		}

		return {
			post : _post
		}
	
	})();

前端收到的返回值为 `"rdk"`

**示例二**

请求url

	http://localhost:5812/rdk/service/app/example/server/my_service

body中参数为：

	param="abc"&aa="bb"&cc="dd"

my_service服务:

	(function() {
	
		function _post(request, script) {
			log(request); // 打印字符串 param="abc"&aa="bb"&cc="dd"
			return "rdk";
		}

		return {
			post : _post
		}
	
	})();

前端收到的返回值为 `"rdk"`

**示例三** 历史遗留问题，不推荐使用这个方式

请求url

	http://localhost:5812/rdk/service/app/example/server/my_service

body中参数为：

	{param: "abc"} // 注意这是一个合法json，且包含一个被保留的param属性

my_service服务:

	(function() {
	
		function _post(request, script) {
			log(request); // 打印字符串 "abc"
			return "rdk";
		}

		return {
			post : _post
		}
	
	})();

前端收到的返回值为 `{result: "rdk"}`