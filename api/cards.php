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
			case 'POST': $this->post($request, $body); break;
		}
	}
	private function delete($request){
		if(count($request) % 2 == 0) return;
		$walk = $this->cardWalk($request);
		array_splice($walk['pre'], $walk['index'], 1);
		$this->write();
		echo $this->json(array('ok' => true));
	}
	private function put($request, $body){
		if(count($request) % 2 == 0) return;
		$walk = $this->cardWalk($request);
		foreach($body as $key => $value){
			$walk['cur'][$key] = $value;
		}
		$this->write();
		echo $this->json(array('ok' => true));
	}
	private function post($request, $body){
		if(count($request) % 2 == 1) return;
		$walk = $this->cardWalk($request);
		$id = $walk['cur'][count($walk['cur'])-1]['id'] + 1;
		$body['id'] = $id;
		array_push($walk['cur'], $body);
		$this->write();
		echo $this->json(array('id' => $id));
	}
	private function cardWalk($request){
		$walk = &$this->cards;
		$preWalk = &$this->cards;
		$index;
		for($i = 0, $ic = count($request); $i < $ic; $i++){
			if($i % 2){
				$preWalk = &$walk;
				$index = $request[$i];
				$walk = &$walk[$request[$i]];
			} else {
				for($j = 0, $jc = count($walk); $j < $jc; $j++){
					if($walk[$j]['id'] == $request[$i]){
						$preWalk = &$walk;
						$index = $j;
						$walk = &$walk[$j];
						break;
					}
				}
			}
		}
		return array('cur' => &$walk, 'pre' => &$preWalk, 'index' => $index);
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
