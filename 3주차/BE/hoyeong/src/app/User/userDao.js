// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT Id,username, email, region 
                FROM User;
                `;

  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT Id,username,email, region 
                FROM User
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// Id 회원 조회
async function selectUserId(connection, Id) {
  const selectUserIdQuery = `
                 SELECT Id, username, email , region
                 FROM User 
                 WHERE Id = ?;
                 `;
  const [IdRow] = await connection.query(selectUserIdQuery, Id);
  return IdRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(username,email, Id, password, region)
        VALUES (?,?,?,?,?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email,Id, username, password
        FROM User 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, Id
        FROM User
        WHERE email = ?;
        `;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, Id, username) {
  const updateUserQuery = `
  UPDATE User 
  SET username = ?
  WHERE Id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [username, Id]);
  return updateUserRow[0];
}

// 지역 게시물 조회
async function selectUserPost(connection, regionId) {
  const selectUserPostQuery = `
    select User.username, User.region, User.profileImg, Post.subject, Post.content
    from Post
    inner join User on User.userId = Post.userId
    where Post.regionId=?;
                `;
  const [PostRows] = await connection.query(selectUserPostQuery, regionId);
  return PostRows;
}
// 모든 게시물 조회
async function selectPost(connection) {
  const selectPostListQuery = `
                SELECT postId,subject,content, regionId,userId 
                FROM Post;
                `;

  const [PostRows] = await connection.query(selectPostListQuery);
  return PostRows;

}

// 게시글 생성
async function insertPostInfo(connection, insertPostInfoParams) {
  const insertPostInfoQuery = `
        INSERT INTO Post(userId, regionId,subject, content)
        VALUES (?,?,?,?);
    `;
  const insertPostInfoRow = await connection.query(
      insertPostInfoQuery,
      insertPostInfoParams
  );

  return insertPostInfoRow;
}

// 지역 상품 조회
async function selectUserItem(connection, regionId) {
  const selectUserItemQuery = `
    select User.region, Item.price, Item.title, Item.itemImg
    from Item
           inner join User on User.userId = Item.sellerId
           inner join Districts on Districts.districtId = Item.regionId
    where Item.regionId=?;
                `;
  const [ItemRows] = await connection.query(selectUserItemQuery, regionId);
  return ItemRows;
}
// 모든 상품 조회
async function selectItem(connection) {
  const selectItemListQuery = `
                SELECT itemId,price,title,content, regionId,sellerId,categoryId
                FROM Item;
                `;

  const [ItemRows] = await connection.query(selectItemListQuery);
  return ItemRows;

}
// 상품 생성
async function insertItemInfo(connection, insertItemInfoParams) {
  const insertItemInfoQuery = `
        INSERT INTO Item(sellerId, regionId,categoryId,title, content, price)
        VALUES (?,?,?,?,?,?);
    `;
  const insertItemInfoRow = await connection.query(
      insertItemInfoQuery,
      insertItemInfoParams
  );

  return insertItemInfoRow;
}

// 회원 삭제
async function deleteUserId(connection, Id) {
  const deleteUserIdQuery = `
                delete from User where Id=?;
                 `;
  const [IdRow] = await connection.query(deleteUserIdQuery, Id);
  return IdRow;
}
// 게시글 삭제
async function deletePostId(connection, postId) {
  const deletePostIdQuery = `
                delete from Post where postId=?;
                 `;
  const [postIdRow] = await connection.query(deletePostIdQuery, postId);
  return postIdRow;
}
// 상품 삭제
async function deleteItemId(connection,ItemId) {
  const deleteItemIdQuery = `
                delete from Item where ItemId=?;
                 `;
  const [ItemIdRow] = await connection.query(deleteItemIdQuery, ItemId);
  return ItemIdRow;
}

// postId 게시물 조회
async function selectPostId(connection, postId) {
  const selectPostIdQuery = `
                 SELECT postId, subject, content , regionId,userId
                 FROM Post 
                 WHERE postId = ?;
                 `;
  const [postIdRow] = await connection.query(selectPostIdQuery, postId);
  return postIdRow;
}

// itemId 상품 조회
async function selectItemId(connection, itemId) {
  const selectItemIdQuery = `
                 SELECT itemId, price,title, content , regionId,sellerId,categoryId
                 FROM Item 
                 WHERE itemId = ?;
                 `;
  const [itemIdRow] = await connection.query(selectItemIdQuery, itemId);
  return itemIdRow;
}

// 사용자 정보 수정
async function updateUserInfo(connection, updateUserInfoParams) {
  const updateUserInfoQuery = `
    UPDATE User SET username = ? , region =?, email=? WHERE Id =?;
    `;
  const updateUserInfoRow = await connection.query(
      updateUserInfoQuery,
      updateUserInfoParams
  );

  return updateUserInfoRow;
}
// 게시물 정보 수정
async function updatePostInfo(connection, updatePostInfoParams) {
  const updatePostInfoQuery = `
    UPDATE Post SET subject = ? , content=?, regionId=? WHERE postId =?;
    `;
  const updatePostInfoRow = await connection.query(
      updatePostInfoQuery,
      updatePostInfoParams
  );

  return updatePostInfoRow;
}

// 상품 정보 수정
async function updateItemInfo(connection, updateItemInfoParams) {
  const updateItemInfoQuery = `
    UPDATE Item SET title = ? , content=?, regionId=?, price=?, categoryId=?,sellerId=? WHERE itemId =?;
    `;
  const updateItemInfoRow = await connection.query(
      updateItemInfoQuery,
      updateItemInfoParams
  );

  return updateItemInfoRow;
}

// 댓글 생성
async function insertCommentInfo(connection, insertCommentInfoParams) {
  const insertCommentInfoQuery = `
        INSERT INTO Comment(content,postId, userId,regionId)
        VALUES (?,?,?,?);
    `;
  const insertCommentInfoRow = await connection.query(
      insertCommentInfoQuery,
      insertCommentInfoParams
  );

  return insertCommentInfoRow;
}

// 모든 댓글 조회
async function selectComment(connection) {
  const selectCommentListQuery = `
                SELECT Comment.content,Comment.postId, Comment.userId,Comment.regionId, Cocoment.couserId, Cocoment.cocontent,Comment.commentId
                FROM Comment
                      left join Cocoment on Comment.commentId=Cocoment.commentId;
                `;

  const [CommentRows] = await connection.query(selectCommentListQuery);
  return CommentRows;
}


// 게시판 댓글 조회
async function selectCommentId(connection, postId) {
  const selectCommentIdQuery = `
    SELECT Comment.content,Comment.postId, Comment.userId,Comment.regionId, Cocoment.couserId, Cocoment.cocontent,Comment.commentId
    FROM Comment
           left join Cocoment on Comment.commentId=Cocoment.commentId
    WHERE Comment.postId = ?;
                 `;
  const [postIdRow] = await connection.query(selectCommentIdQuery, postId);
  return postIdRow;
}
// 특정 댓글 조회
async function selectCommentIdById(connection, commentId) {
  const selectCommentIdQuery = `
                 SELECT commentId, content, postId , userId, regionId
                 FROM Comment 
                 WHERE commentId = ?;
                 `;
  const [commentIdRow] = await connection.query(selectCommentIdQuery, commentId);
  return commentIdRow;
}
// 댓글 정보 수정
async function updateCommentInfo(connection, updateCommentInfoParams) {
  const updateCommentInfoQuery = `
    UPDATE Comment SET content=?, regionId=? WHERE commentId =?;
    `;
  const updateCommentInfoRow = await connection.query(
      updateCommentInfoQuery,
      updateCommentInfoParams
  );

  return updateCommentInfoRow;
}

// 댓글 삭제
async function deleteCommentId(connection, commentId) {
  const deleteCommentIdQuery = `
                delete from Comment where commentId=?;
                 `;
  const [commentIdRow] = await connection.query(deleteCommentIdQuery, commentId);
  return commentIdRow;
}


module.exports = {
  selectUser,
  selectPost,
  selectUserEmail,
  selectUserId,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  selectUserPost,
  insertPostInfo,
  selectUserItem,
  insertItemInfo,
  deleteUserId,
  deletePostId,
  deleteItemId,
  selectItem,
  selectPostId,
  selectItemId,
  updateUserInfo,
  updatePostInfo,
  updateItemInfo,
  insertCommentInfo,
  selectComment,
  selectCommentId,
  selectCommentIdById,
  updateCommentInfo,
  deleteCommentId
};
