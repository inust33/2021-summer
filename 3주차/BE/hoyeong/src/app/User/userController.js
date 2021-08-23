const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */

exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS));
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {username,email, Id, password, region} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        username,
        email,
        Id,
        password,
        region
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const Id = req.params.Id;

    if (!Id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(Id);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.Id

    const Id = req.params.Id;
    const username = req.body.username;

    if (userIdFromJWT != Id) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!username) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(Id, username)
        return res.send(editUserInfo);
    }
};











/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.Id;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};









/**
 * API No. 6
 * API Name : 게시물 조회 API (+ 지역 검색 조회)
 * [GET] /app/posts
 */
exports.getPosts = async function (req, res) {

    /**
     * Query String: email
     */
    const regionId = req.query.regionId;

    if (!regionId) {
        // 게시물 전체 조회
        const PostListResult = await userProvider.retrievePostList();
        return res.send(response(baseResponse.SUCCESS, PostListResult));
    } else {
        // 게시물 검색 조회
        const userListByRegionId = await userProvider.retrievePostList(regionId);
        return res.send(response(baseResponse.SUCCESS, userListByRegionId));
    }
};

/**
 * API No. 7
 * API Name : 상품 조회 API (+ 지역 검색 조회)
 * [GET] /app/posts
 */
exports.getItems = async function (req, res) {

    /**
     * Query String: email
     */
    const regionId = req.query.regionId;

    if (!regionId) {
        // 게시물 전체 조회
        const ItemListResult = await userProvider.retrieveItemList();
        return res.send(response(baseResponse.SUCCESS, ItemListResult));
    } else {
        // 게시물 검색 조회
        const userListByRegionId = await userProvider.retrieveItemList(regionId);
        return res.send(response(baseResponse.SUCCESS, userListByRegionId));
    }
};

/**
 * API No. 8
 * API Name : 게시물 생성 API
 * [POST] /app/posts
 */
exports.postPosts = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {userId,regionId, subject, content} = req.body;

    // validation - 추가하기

    // 주제 체크
    if (!subject)
        return res.send(response(baseResponse.BULLETIN_SUBJECT_EMPTY));

    // 길이 체크
    if (subject.length < 1)
        return res.send(response(baseResponse.BULLETIN_SUBJECT_LENGTH));

    // 내용 체크
    if (!content)
        return res.send(response(baseResponse.BULLETIN_CONTENT_EMPTY));

    // 길이 체크
    if (content.length < 1)
        return res.send(response(baseResponse.BULLETIN_CONTENT_LENGTH));

    const registerPost = await userService.createPost(
        userId,
        regionId,
        subject,
        content
    );

    return res.send(registerPost);
};


/**
 * API No. 9
 * API Name : 상품 생성 API
 * [POST] /app/items
 */
exports.postItems = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {sellerId, regionId,categoryId,title, content, price} = req.body;

    // validation - 추가하기

    // 주제 체크
    if (!title)
        return res.send(response(baseResponse.BULLETIN_TITLE_EMPTY));

    // 길이 체크
    if (title.length < 1)
        return res.send(response(baseResponse.BULLETIN_TITLE_LENGTH));

    // 내용 체크
    if (!content)
        return res.send(response(baseResponse.BULLETIN_CONTENT_EMPTY));

    // 길이 체크
    if (content.length < 1)
        return res.send(response(baseResponse.BULLETIN_CONTENT_LENGTH));

    // 카테고리 체크
    if (!categoryId)
        return res.send(response(baseResponse.BULLETIN_CATEGORYID_EMPTY));



    const registerItem = await userService.createItem(
        sellerId,
        regionId,
        categoryId,
        title,
        content,
        price
    );

    return res.send(registerItem);
};

/**
 * API No. 10
 * API Name : 특정 유저 삭제 API
 * [delete] /app/users/{userId}
 */
exports.deleteUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const Id = req.params.Id;

    if (!Id) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const deleteByUserId = await userProvider.deleteUser(Id);
    return res.send(response(baseResponse.SUCCESS, deleteByUserId));
};

/**
 * API No. 11
 * API Name : 특정 게시물 삭제 API
 * [delete] /app/postss/{postId}
 */
exports.deletePostById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const postId = req.params.postId;

    if (!postId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const deleteByPostId = await userProvider.deletePost(postId);
    return res.send(response(baseResponse.SUCCESS, deleteByPostId));
};


/**
 * API No. 12
 * API Name : 특정 상품 삭제 API
 * [delete] /app/items/{ItemId}
 */
exports.deleteItemById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const ItemId = req.params.ItemId;

    if (!ItemId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const deleteByItemId = await userProvider.deleteItem(ItemId);
    return res.send(response(baseResponse.SUCCESS, deleteByItemId));
};


/**
 * API No. 13
 * API Name : 특정 게시물 조회 API
 * [GET] /app/posts/{postId}
 */
exports.getPostById = async function (req, res) {

    /**
     * Path Variable: postId
     */
    const postId = req.params.postId;

    if (!postId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const postByPostId = await userProvider.retrievePost(postId);
    return res.send(response(baseResponse.SUCCESS, postByPostId));
};

/**
 * API No. 14
 * API Name : 특정 상품 조회 API
 * [GET] /app/items/{itemId}
 */
exports.getItemById = async function (req, res) {

    /**
     * Path Variable: itemId
     */
    const itemId = req.params.itemId;

    if (!itemId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const itemByItemId = await userProvider.retrieveItem(itemId);
    return res.send(response(baseResponse.SUCCESS, itemByItemId));
};


/**
 * API No. 15
 * API Name : 사용자 수정 API
 * [PUT] /app/users
 */
exports.putUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {username,region,email,Id} = req.body;
    // validation - 추가하기


    const updateUsers = await userService.updateUser(
        username,
        region,
        email,
        Id
    );
    return res.send(updateUsers);
};

/**
 * API No. 16
 * API Name : 게시물 수정 API
 * [PUT] /app/posts
 */
exports.putPosts = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {subject,content, regionId, postId} = req.body;
    // validation - 추가하기


    const updatePosts = await userService.updatePost(
        subject,
        content,
        regionId,
        postId
    );
    return res.send(updatePosts);
};

/**
 * API No. 17
 * API Name : 상품 수정 API
 * [PUT] /app/items
 */
exports.putItems = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {title,content, regionId, price, categoryId,sellerId,itemId} = req.body;
    // validation - 추가하기


    const updateItems = await userService.updateItem(
        title,
        content,
        regionId,
        price,
        categoryId,
        sellerId,
        itemId
    );
    return res.send(updateItems);
};


/**
 * API No. 18
 * API Name : 댓글 생성 API
 * [POST] /app/comments
 */
exports.postComments = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {content,postId, userId,regionId} = req.body;

    // validation - 추가하기

    // 내용 체크
    if (!content)
        return res.send(response(baseResponse.BULLETIN_CONTENT_EMPTY));

    // 길이 체크
    if (content.length < 1)
        return res.send(response(baseResponse.BULLETIN_CONTENT_LENGTH));


    const registerComment = await userService.createComment(
        content,
        postId,
        userId,
        regionId
    );

    return res.send(registerComment);
};

/**
 * API No. 19
 * API Name : 댓글 조회 API (+ PostId 검색 조회)
 * [GET] /app/comments
 */
exports.getComments = async function (req, res) {

    /**
     * Query String: email
     */
    const postId = req.query.postId;

    if (!postId) {
        // 게시물 전체 조회
        const CommentListResult = await userProvider.retrieveCommentList();
        return res.send(response(baseResponse.SUCCESS, CommentListResult));
    } else {
        // 게시물 검색 조회
        const commentListByRegionId = await userProvider.retrieveCommentList(postId);
        return res.send(response(baseResponse.SUCCESS, commentListByRegionId));
    }
};

/**
 * API No. 20
 * API Name : 특정 댓글 조회 API
 * [GET] /app/comments/{commentId}
 */
exports.getCommentsById = async function (req, res) {

    /**
     * Path Variable: commentId
     */
    const commentId = req.params.commentId;

    if (!commentId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const commentByCommentId = await userProvider.retrieveComment(commentId);
    return res.send(response(baseResponse.SUCCESS, commentByCommentId));
};

/**
 * API No. 21
 * API Name : 댓글 수정 API
 * [PUT] /app/comments
 */
exports.putComments = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {content,regionId,commentId} = req.body;
    // validation - 추가하기


    const updateComments = await userService.updateComments(
        content,
        regionId,
        commentId
    );
    return res.send(updateComments);
};


/**
 * API No. 22
 * API Name : 특정 댓글 삭제 API
 * [delete] /app/comments/{commentId}
 */
exports.deleteCommentById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const commentId = req.params.commentId;

    if (!commentId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const deleteByCommentId = await userProvider.deleteComment(commentId);
    return res.send(response(baseResponse.SUCCESS, deleteByCommentId));
};