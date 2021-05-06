<?php
include('database.php');
if(isset($_POST['prueba'])){
    $id=$_POST['prueba'];
$query="DELETE FROM task where id=$id";
$result=mysqli_query($connection,$query);
if(!$result)
{die('query failed'.mysqli_error());}
echo 'task OK';
}
?>