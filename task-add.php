<?php
include('database.php');

if(isset($_POST['name']))
{
    
    $name=$_POST['name'];
    $description=$_POST['description'];
    $query="INSERT into task(name,description) VALUES('$name','$description')";
   $result= mysqli_query($connection,$query);
    if(!$result)

    { echo mysqli_error();
        die('la consulta ha fallado');}
    echo 'Tarea agregada satifcactoriamente';
}


?>