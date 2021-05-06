<?php
include('database.php');
$id=$_POST['id'];
$query="SELECT * from task where id=$id";
$result=mysqli_query($connection,$query);
if(!$result){
    die('Query Failed'.mysqli_error());
}
$json=array();
while($row=  mysqli_fetch_array($result)){
    $json[]=array('name'=>$row['name'],'description'=>$row['description'],'id'=>$row['id']);
}
$jsonstring=json_encode($json[0]);
echo $jsonstring;

?>