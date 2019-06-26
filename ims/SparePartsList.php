<?php
include 'DBConfig.php';

// Create connection
$search = isset($_GET['search'])?$_GET['search']:""; 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
}  
$tem=[];
$sql = "
SELECT 
	tss.STOCK_ID
	,tss.STOCK_BRAND
	,tss.STOCK_CRITICAL_LEVEL
	,tss.STOCK_QUANTITY 
	,tss.STOCK_KEY_UNIT
	,tss.STOCK_MODEL
	,tss.STOCK_NAME
	,tss.STOCK_SIZE
	,rut.UNIT_TYPE
	,rc.CON_NAME
	,rs.SUP_NAME
	,rs.SUP_EMAIL
	,rs.SUP_CONTACT_NO
	,rs.SUP_ADDRESS
	, CASE WHEN tss.STOCK_CRITICAL_LEVEL >= tss.STOCK_QUANTITY then '#fbc7c7' else '#f9f9f98c' end isCritical
FROM t_spare_stocks tss
INNER JOIN r_unit_type rut on tss.STOCK_UNIT_TYPE = rut.UNIT_ID
INNER JOIN r_condition rc on tss.STOCK_CONDITION = rc.CON_ID
INNER JOIN r_supplier rs on tss.STOCK_SUPPLIER = rs.SUP_ID 
WHERE tss.STOCK_NAME LIKE '%$search%' OR tss.STOCK_KEY_UNIT LIKE '%$search%' ";

$result = $conn->query($sql);
 
while($row[] = $result->fetch_assoc())  
$tem = $row; 
echo json_encode($tem);
$conn->close();
?>