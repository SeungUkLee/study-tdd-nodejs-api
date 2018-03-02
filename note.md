역할에 따라 파일로 분리한다.
 - api/user/index.js
 - api/user/user.ctrl.js
 - api/user/user.ctrl.js
 
테스트 결과는 테스트에 관련된 내용만 보이는게 깔끔하고 좋다.
환경변수를 쓰자.
테스트를 돌릴때 환경변수로 NODE_ENV = test 라고 두자.

~~~ package.json
...
{
    "scripts": {
        "test": "NODE_ENV=test mocha api/user/user.spec.js"
    },
    ...
}
~~~

test라는 변수는 노드에서는 process라는 객체에 할당되서 들어온다.

~~~ index.js
...
// app.use(morgan('dev'))

// 이렇게 해두면 package.json 의 script 부분에
// NODE_ENV = test 라고 해두었으니
// 테스트 환경일때는 로그가 보이지 않을 것이다.
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
}
...
~~~
