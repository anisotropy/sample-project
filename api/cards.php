<?php
$cardDataPath = dirname(__FILE__).'/../data/cards.json';
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$cards = @json_decode(file_get_contents($cardDataPath), true);

switch($method){
	case 'GET':
		echo @json_encode($cards, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
		break;
	case 'DELETE':
		$walk = &$cards;
		$count = count($request);
		for($i = 0; $i <= $count-2; $i++ ){
			$walk = &$walk[$request[$i]];
		}
		$lastKey = $request[$count-1];
		if(is_numeric($lastKey)){
			array_splice($walk, $lastKey, 1);
		} else {
			unset($walk[$lastKey]);
		}
		@file_put_contents($cardDataPath, @json_encode($cards, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
		break;
}
?>
