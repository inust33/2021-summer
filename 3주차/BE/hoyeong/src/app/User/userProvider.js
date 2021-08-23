const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveUser = async function (Id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection,Id);

  connection.release();

  return userResult[0];
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};


//게시글 조회
exports.retrievePostList = async function (regionId) {
  if (!regionId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const PostListResult = await userDao.selectPost(connection);
    connection.release();

    return PostListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const PostListResult = await userDao.selectUserPost(connection, regionId);
    connection.release();

    return PostListResult;
  }
};
//상품 조회
exports.retrieveItemList = async function (regionId) {
  if (!regionId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const ItemListResult = await userDao.selectItem(connection);
    connection.release();

    return ItemListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const ItemListResult = await userDao.selectUserItem(connection, regionId);
    connection.release();

    return ItemListResult;
  }
};
//유저 삭제

exports.deleteUser = async function (Id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.deleteUserId(connection,Id);

  connection.release();

  return userResult[0];
};

//게시물 삭제

exports.deletePost = async function (postId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.deletePostId(connection,postId);

  connection.release();

  return userResult[0];
};

//상품 삭제
exports.deleteItem = async function (ItemId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.deleteItemId(connection,ItemId);

  connection.release();

  return userResult[0];
};

//특정 게시물 조회
exports.retrievePost = async function (postId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const postResult = await userDao.selectPostId(connection,postId);

  connection.release();

  return postResult[0];
};


// 게시물 댓글 조회
exports.retrieveCommentList = async function (postId) {
  if (!postId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const CommentListResult = await userDao.selectComment(connection);
    connection.release();

    return CommentListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const CommentListResult = await userDao.selectCommentId(connection, postId);
    connection.release();

    return CommentListResult;
  }
};

//특정 게시물 조회
exports.retrieveComment = async function (commentId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commentResult = await userDao.selectCommentIdById(connection,commentId);

  connection.release();

  return commentResult[0];
};

//특정 댓글 삭제
exports.deleteComment = async function (commentId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commentResult = await userDao.deleteCommentId(connection,commentId);

  connection.release();

  return commentResult[0];
};