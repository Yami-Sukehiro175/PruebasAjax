<?php
include('database.php');
$name= $_POST['name'];
$description= $_POST['description'];
$id= $_POST['id'];

$query="UPDATE task set name='$name',description='$description' where id='$id'";
$result=mysqli_query($connection,$query);
if(!$result)
{die('query failed'.mysqli_error());

}
echo "update task successfully";
?>