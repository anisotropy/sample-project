<?php
class CardApi {
	function __construct(){
		$this->cardDataPath = dirname(__FILE__).'/../data/cards.json';
		$this->cards = @json_decode(@file_get_contents($this->cardDataPath), true);

		$method = $_SERVER['REQUEST_METHOD'];
		$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
		$body = @json_decode(@file_get_contents('php://input'), true);

		switch($method){
			case 'GET': echo $this->read(); break;
			case 'DELETE': $this->delete($request); break;
			case 'PUT': $this->put($request, $body); break;
		}
	}
	private function delete($request){
		$walk = &$this->cards;
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
		$this->write();
	}
	private function put($request, $body){
		$walk = &$this->cards;
		$count = count($request);
		for($i = 0; $i <= $count-1; $i++ ){
			$walk = &$walk[$request[$i]];
		}
		foreach($body as $key => $value){
			$walk[$key] = $value;
		}
		$this->write();
	}
	private function read(){
		return @file_get_contents($this->cardDataPath);
	}
	private function write(){
		@file_put_contents($this->cardDataPath, $this->json($this->cards));
	}
	private function json($data){
		return @json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
	}
}
new CardApi();
?>
