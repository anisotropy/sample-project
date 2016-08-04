# sample project
샘플 프로젝트

# 특징
* React
* jQuery
* Less loader
* Json loader

## 참고한 자료
* [Webpack for reack](http://www.pro-react.com/materials/appendixA/)
* [React Tutorial](https://github.com/facebook/react/blob/master/docs/docs/tutorial.md)

## 시스템
* 설치: ``` npm install ```
* 개발: ``` npm start ```
* 배포: ``` npm run build ```

## 파일 구조
* ```api/```: 서버측 코드가 저장.
* ```app/```: 개발용 클라이언트측 코드가 저장. 여기에 저장된 코드들은 모두 ```build/bundle.js```로 컴파일된다.
* ```app/contrib.js```: 컴파일될 외부 코드/모듈들을 가져온다. 이 파일/모듈은 ```config.js```의 ```globalModules```에 포함되어 있다. 이 파일에 포함된 코드/모듈은 ```Contrib.모듈이름```의 형식으로 사용한다.
* ```app/index.tmpl.html```: 실제로 실행될 ```build/index.html```을 위한 텔플릿.
* ```build/```: 컴파일된 코드가 저장.
* ```build/bundle.js```: 컴파일된 스크립트.
* ```build/style.css```: 컴파일된 스타일시트.
* ```config.js```: 다음과 같은 경우에 이 파일을 수정한다. 이 파일을 수정하면 ```npm start```를 다시 실행한 뒤에 개발을 계속 한다.
  * 컴파일을 위한 entry를 수정할 때
  * 글로벌 모듈을 추가하거나 삭제할 때

## 기타
* ```webpack```에 의해 각 스크립트 파일은 모듈화되므로 ```(function(){ ... })()```으로 감쌀 필요가 없다.
