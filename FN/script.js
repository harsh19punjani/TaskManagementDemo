var app=angular.module("app",[]);
app.controller("mycntrl",function($scope,$http){
  $scope.hp="harsh";
  $http.get("http://localhost:7000/arjun").then(function(response) {
       $scope.myWelcome = response.data;
   });
   $http.get("http://localhost:7000/arjun/kedar").then(function(response) {
        $scope.myWelcome2 = response.data;
    });
  $scope.data = {name: "Harsh Punjani"};
    $http.post("http://localhost:7000/arjun/tarun", $scope.data).then(function(response) {
         $scope.myWelcome3 = response.data;
     });


     //post data services
     $scope.submitform = function(){
       $scope.taskdata = {taskName: $scope.taskName, taskDescription: $scope.taskDescription,taskstarttdate:$scope.taskstdate,taskdate:$scope.taskdate,taskcreatedby:$scope.taskcreatedby};
       $http.post("http://localhost:7000/taskmang/addtask", $scope.taskdata).then(function(response) {
            $scope.taskResponse = response.data;
              $scope.close();
              $scope.getTaskData();



        });
     }




     //Update data services
     $scope.Updateform = function(){
       $scope.updatetaskdata = {taskName: $scope.taskName, taskDescription: $scope.taskDescription,taskstarttdate:$scope.taskstdate,taskdate:$scope.taskdate,taskcreatedby:$scope.taskcreatedby,_id:$scope. _id};
       $http.put("http://localhost:7000/taskmang/updatetask", $scope.updatetaskdata).then(function(response) {
            $scope.taskResponse = response.data;
              $scope.close();
              $scope.getTaskData();
        });
     }


<!--add task-->

$scope.addtask=function()
{
  $scope.taskName="";
  $scope.taskDescription="";
  $scope.taskdate="";
  $scope.taskcreatedby="";
  $scope.taskstdate="";
  $('#myModal').modal('show');
}

<!--view model-->
$scope.edittsk=function(data){
$scope.updatetaskdata=data
$scope. _id=data._id;
$scope.taskName=data.taskName;
$scope.taskDescription=data.taskDescription;
$scope.taskdate=new Date(data.taskdate);
$scope.taskcreatedby=data.taskcreatedby;
$scope.taskstdate=new Date( data.taskstarttdate);
$('#viwmodel').modal('show');
}

$scope.cnfdelete=function()
{
  $scope.deletevalue = {_id:$scope. _id};
  $http.put("http://localhost:7000/taskmang/deletetask", $scope.deletevalue).then(function(response) {
       //$scope.taskResponse = response.data;
         $scope.taskResponse = response.data;
         $scope.close();
         $scope.getTaskData();
   });

}


$scope.delete=function(data)
{
  $scope.taskname=data.taskName;
  $scope. _id=data._id;
$('#Delete').modal('show');

}


<!--search auto-->
$scope.searchapi=function(data){
//$scope.seaarch=data;
  $http.get("http://localhost:7000/taskmang/search", {params: {search: $scope.search}}).then(function(response) {

    //alert(JSON.stringify(response.data));
       $scope.searchvalue = response.data;
   });
}

<!--auto suggestion click-->
$scope.searchclick=function(data)
{
  $scope.search=data.taskName;
  $scope.searchvalue="";

  $http.get("http://localhost:7000/taskmang/search", {params: {search: $scope.search}}).then(function(response) {

    //alert(JSON.stringify(response.data));
       $scope.resptaskdata = response.data;
   });


}

$scope.close=function() {
  $('#myModal').modal('hide');
  $('#viwmodel').modal('hide');
  $('#Delete').modal('hide');
}
     //view data service
     $scope.getTaskData = function(){
       $http.get("http://localhost:7000/taskmang/viewtask").then(function(response) {
            $scope.resptaskdata = response.data;
        });
     }
     $scope.getTaskData();
});
