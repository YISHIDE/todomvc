/**
 * Created by 80474 on 2016/11/14.
 */
(function(angular){
	var app=angular.module('TodoApp');
	app.directive('autoFocus',[function(){
		return{
			link:function(scope, element, attributes){
               element.on('dblclick',function(){
				   console.log(element);
				   element.find('input').eq(1)[0].focus();
			   })
			}
		}
	}])
})(angular)
