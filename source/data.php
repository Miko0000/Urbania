<?php
	if(php_sapi_name() == "cli"){
		return ;
	}

	$uri = $_SERVER["REQUEST_URI"];
	include "." . substr($uri, strlen("/urbania/source"));

	$types = array(
		"css" => "text/css",
		"html" => "text/html",
		"php" => "text/html"
	);
	$type = array_pop(explode('.', $uri));

	if($type = $types[$type]){
		header("Content-Type: " . $type);
	}
	/*echo substr($_SERVER["REQUEST_URI"], strlen("/urbania/source"));*/
?>