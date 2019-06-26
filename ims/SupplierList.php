<?php
include 'DBConfig.php';

// Create connection 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
}  
$tem=[];
$sql = "SELECT * FROM r_supplier";

$result = $conn->query($sql);
 
while($row[] = $result->fetch_assoc())  
$tem = $row; 
echo json_encode($tem);
$conn->close();
?>