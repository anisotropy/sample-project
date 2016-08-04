<?php
$data = file_get_contents('../data/comments.json');
if(empty($_POST)){
	echo $data;
} else {
	$comment = $_POST;
	$data = @json_decode($data);
	@array_push($data, $comment);
	$data = @json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
	@file_put_contents('../data/comments.json', $data);
	echo $data;
}
?>
