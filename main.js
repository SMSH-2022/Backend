const express=require('express');
const app=express();

// const members=require('./members')

//미들웨어
// app.use(express.json());

//메인페이지
app.get('/',async(req,res)=>{
    res.send('<h1>hello</h1>');

});

//게시물 목록
app.get('/posts',async(req,res)=>{
    res.send('<h1>게시글목록</h1>');
});


//게시물 보기
app.get('/posts/:id',async(req,res)=>{
    
    const{ id } = req.params;
    res.send(`${id}게시물목록페이지`);


});

//게시물 작성
app.get('/posts/:id',async(req,res)=>{
    
    const{ id } = req.params;
    res.send(`${id}게시물목록페이지`);


});


app.listen(3000,()=>{
    console.log('Server is listening...');
});