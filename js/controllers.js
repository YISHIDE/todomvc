/**
 * Created by 80474 on 2016/11/14.
 */
(function(angular){
	//获取模块
	var app=angular.module("TodoApp");
	app.controller('MainController',[
		'$scope',
		'$location',
		'Storage',
		function($scope,$location,Storage){
		$scope.input="";
		$scope.currentEdit=0;
		//模型的行为
		$scope.storages=Storage.get();
		//双击进入编辑模式
		$scope.edit=function(current){
			$scope.currentEdit=current.id;
		};
		//离开焦点退出编辑模式
		$scope.move=function(){
			//添加修改方法
			$scope.currentEdit=0;
			Storage.save();
		};
		//删除
		$scope.remove=function(current){
            Storage.remove(current);
		};
		//添加列表
		//$scope.add=function(){
		//	$scope.storages.push({
		//		id:$scope.storages.length+1,
		//		name:$scope.input,
		//		completed:false
		//	});
		//	$scope.input="";
		//};
		//	添加功能的具体功能抽象到服务模块上
		$scope.add=function(){
			if(!($scope.input)) return;
			Storage.add($scope.input);
			$scope.input="";
		};
		$scope.isOver=function(){
			//遍历列表
			var flag=false;
			var list=$scope.storages;
			for(var k in list){
				if(list[k].completed){
					flag=true;
					break;
				}
			}
			return flag;
		};
		//删除选中的
		$scope.removeSelected=function(){
			$scope.storages=Storage.deleteSelected();
			Storage.save();
		};
		// function(){
		//	//var list=[];
		//	//$scope.storages.forEach(function(item){
		//	//	if(!item.completed){
		//	//		list.push(item);
		//	//	}
		//	//});
		//	//$scope.storages=list;
		//};
		//切换状态
		$scope.filterData={};
		//var url=$location.url();
		$scope.location=$location;
		$scope.$watch('location.url()',function(now,old){
			switch (now){
				case "/active":
					$scope.filterData={completed:false};
					break;
				case "/completed":
					$scope.filterData={completed:true};
					break;
				default :
					$scope.filterData={};
					break;
			}
		});
		$scope.change=function(obj){
			$scope.filterData=obj;
		}
	}])
})(angular)
