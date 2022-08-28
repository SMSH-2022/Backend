const Post = require('../models/post');
// import db from "../app"
const db = require('../app');

// 모든 게시글 조회
const getAllPost = async (req, res) => {
  try {
    //if -> user.name이 없으면 -> 다시 처음페이지로 redirect
    console.log(db, '########여기다#####');
    // let user = db.db[1]
    // console.log(user);
    if (db.db[1]) {
      console.log('있음');
      const posts = await Post.find({});
      res.status(200).render('board', { posts });
    } else {
      console.log('없음');
      res.redirect('/');
    }
    // const posts = await Post.find({});
    // res.status(200).render('board', { posts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//홈페이지 생성 (req.user는 passport의 serialize를 통해 user 정보 저장되어있음)
// app.get('/', (req, res) => {
//   const temp = getPage('Welcome', 'Welcome to visit...', getBtn(req.user));
//   res.send(temp);
// });

// 게시글 작성 GET / POST
const getWrite = (req, res) => {
  try {
    res.status(200).render('write');
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const postWrite = async (req, res) => {
  try {
    const {
      body: { title, contents, writer },
    } = req;
    const post = await Post.create({
      title,
      contents,
      writer,
    });
    console.log(writer, '**********');
    res.redirect(`/board/post/${post._id}`);
    // 게시글을 작성한 뒤, 해당 게시글의 상세 페이지로 이동
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 게시글 전체 DELETE - 임시
// 없어도 되는 함수
// 테스트할 때 쌓인 데이터가 너무 많아 정리가 필요해서 만듬

const deleteAllPost = async (req, res) => {
  try {
    await Post.deleteMany({});
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//특정 게시물의 상세 페이지 접근과 삭제
const getOnePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('post', { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    await Post.findOneAndDelete({ _id: postId });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 게시글 수정 GET / POST
const getEditPost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('editPost', { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const postEditPost = async (req, res) => {
  try {
    const {
      params: { postId },
      body: { title, contents },
    } = req;
    await Post.findOneAndUpdate({ _id: postId }, { title, contents });
    res.redirect(`/board/post/${postId}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//exports
module.exports = {
  deleteAllPost,
  getAllPost,
  getWrite,
  postWrite,
  getOnePost,
  getEditPost,
  postEditPost,
  deleteOnePost,
};
