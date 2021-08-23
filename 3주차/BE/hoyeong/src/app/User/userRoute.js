module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    app.get('/app/test', user.getTest);

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users',user.getUsers); 

    // 3. 특정 유저 조회 API
    app.get('/app/users/:Id', user.getUserById);

    // 4. 모든 게시물 조회 API
    app.get('/app/posts',user.getPosts);

    // 5. 모든 상품 조회 API
    app.get('/app/items',user.getItems);

    // 6. 게시물 생성 API
    app.post('/app/posts',user.postPosts);

    // 7. 상품 생성 API
    app.post('/app/items',user.postItems);

    // 8. 유저 삭제 API
    app.delete('/app/users/:Id', user.deleteUserById);

    // 9. 게시물 삭제 API
    app.delete('/app/posts/:postId', user.deletePostById)

    // 10. 상품 삭제 API
    app.delete('/app/items/:ItemId', user.deleteItemById);

    // 11. 특정 게시물 조회 API
    app.get('/app/posts/:postId', user.getPostById);

    // 12. 특정 상품 조회 API
    app.get('/app/items/:itemId', user.getItemById);

    // 13. 사용자 수정 API
    app.put('/app/users', user.putUsers);

    // 14. 게시물 수정 API
    app.put('/app/posts', user.putPosts);

    // 15. 상품 수정 API
    app.put('/app/items', user.putItems);

    // 16. 댓글 생성 API
    app.post('/app/comments', user.postComments);

    // 17. 모든 댓글 조회 API(+검색)
    app.get('/app/comments',user.getComments);

    // 18. 특정 댓글 조회 API
    app.get('/app/comments/:commentId',user.getCommentsById);

    // 19. 댓글 수정 API
    app.put('/app/comments', user.putComments);

    // 20. 댓글 삭제 API
    app.delete('/app/comments/:commentId', user.deleteCommentById)





    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/app/users/:Id', jwtMiddleware, user.patchUsers);



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
//app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API