const express = require('express');
const app = express();

//postRouter.js 파일을 불러오기
const postRouter = require('./routers/postRouter');

//db 가져오기
require('./db');

const globalRouter = require('./routers/globalRouter');


const PORT = process.env.PORT || 3000;
// .env 파일 내의 PORT 값을 가져오고 없다면 3000으로 설정
// 위 예시의 3000번 포트가 사용 중일 경우 다른 포트 사용 가능

//path 접근 시 로그를 확인하기 위해서 morgan 모듈을 설치하자
const morgan = require('morgan');

//view 연결시 사용
const path = require('path');

//Request의 Body를 읽기 위해 express.json 사용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
app.get('/', (req, res) => {
  res.send('Welcome my home 😊');
});
*/
// 아래와같이 수정
// `/`로 접근 시 globalRouter를 사용한다
app.use('/', globalRouter);
app.use('/board', postRouter);
app.use(morgan('dev'));

//view 연결
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
  console.log(`✅ Listening on 'http://localhost:${PORT}'`);
});