const express = require('express');
const app = express();
//db 가져오기
require('./db');

const globalRouter = require('./routers/globalRouter');


const PORT = process.env.PORT || 3000;
// .env 파일 내의 PORT 값을 가져오고 없다면 3000으로 설정
// 위 예시의 3000번 포트가 사용 중일 경우 다른 포트 사용 가능

/*
app.get('/', (req, res) => {
  res.send('Welcome my home 😊');
});
*/
// 아래와같이 수정
// `/`로 접근 시 globalRouter를 사용한다
app.use('/', globalRouter);


app.listen(PORT, () => {
  console.log(`✅ Listening on 'http://localhost:${PORT}'`);
});