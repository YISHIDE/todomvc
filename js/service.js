/**
 * Created by 80474 on 2016/11/14.
 */
//服务模块提供具体的业务逻辑
(function(angular){
	var app=angular.module("TodoApp");
	app.service("Storage",['$window',function($window){
		var storage=JSON.parse($window.localStorage.getItem("my_todos")||'[]');
		 this.save=function(){
			$window.localStorage.setItem("my_todos",JSON.stringify(storage));
		};
		function getId(){
			return Math.random()*100
		};
		this.get=function(){
			return storage;
		};
	    this.add=function(input){
				storage.push({
					id:getId(),
					name:input,
					completed:false
				});
			//存储在本地存储中
			this.save();
		};
		this.remove=function(mytodo){
			//得到列表的索引号
			var index=storage.indexOf(mytodo);
			//根据索引号删除列表内容
			storage.splice(index,1);
			//继续同步到本地存储中
			this.save();
		};
		//删除完成的
		this.deleteSelected=function(){
			var list=[];
			storage.forEach(function(item){
				if(!item.completed){
					list.push(item);
				}
			});
			storage=list;
			return list;
			//this.save();
		};
	}]);
})(angular)
