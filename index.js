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
// app.use('/welcome', globalRouter);

app.use('/board', postRouter);
app.use(morgan('dev'));

//view 연결
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//홈페이지 생성 (req.user는 passport의 serialize를 통해 user 정보 저장되어있음)
app.get('/', (req, res) => {
  const temp = getPage('Welcome', 'Welcome to visit...', '지녕');
  res.send(temp);
});

//페이지 생성 함수
const getPage = (title, description, auth) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            ${auth}
            <h1>${title}</h1>
            <p>${description}</p>
        </body>
        </html>
        `;
};

// //SERVER
app.listen(PORT, () => {
  console.log(`✅ Listening on 'http://localhost:${PORT}'`);
});
