<?php
	require_once('DB_Datos.php');
	$mysqli = new mysqli($servidor, $username, $password, $database);
	if ($mysqli->connect_error) {
		echo "Falló al conectar a MySQL: (" . $mysqli->connect_error . ") " . $mysqli->connect_error;
		exit();
	}
?>
