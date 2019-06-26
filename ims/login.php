<?php
include 'DBConfig.php';
 

if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 


$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$username = $obj['username'];
$password = $obj['password'];
$sql = "SELECT CONCAT(L_NAME,', ',F_NAME) AS FULLNAME, USERNAME, PASSWORD, USER_ROLE FROM r_users  WHERE USERNAME='$username' AND PASSWORD='$password' AND USER_ROLE='user'";

$result = $conn->query($sql);

if ($result->num_rows ==1) {

while($row[] = $result->fetch_assoc()) {
	$tem = $row;
	echo json_encode($tem);
	}
}
 else 
	echo json_encode("");
$conn->close();
?>