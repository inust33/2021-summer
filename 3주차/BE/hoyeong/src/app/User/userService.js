const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (username,email,Id, password,region) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [username, email,Id, hashedPassword,region];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (email, password) {
    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].email

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "N") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].Id) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].Id,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "User",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'Id': userInfoRows[0].id, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.editUser = async function (Id, username) {
    try {
        console.log(Id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, Id, username)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


//게시글 생성
exports.createPost = async function (userId,regionId, subject,content ){
    try {

        const insertPostInfoParams = [userId,regionId,subject, content];

        const connection = await pool.getConnection(async (conn) => conn);

        const PostResult = await userDao.insertPostInfo(connection, insertPostInfoParams);
        console.log(`추가된 게시글 : ${PostResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//상품 생성
exports.createItem = async function (sellerId, regionId,categoryId,title, content, price ){
    try {

        const insertItemInfoParams = [sellerId, regionId,categoryId,title, content, price];

        const connection = await pool.getConnection(async (conn) => conn);

        const ItemResult = await userDao.insertItemInfo(connection, insertItemInfoParams);
        console.log(`추가된 게시글 : ${ItemResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createItem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//유저 수정
exports.updateUser = async function (username,region,email,Id ){
    try {

        const updateUserInfoParams = [username,region,email,Id];

        const connection = await pool.getConnection(async (conn) => conn);

        const UserResult = await userDao.updateUserInfo(connection, updateUserInfoParams);
        console.log(`수정된 유저 : ${UserResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


//게시물 수정
exports.updatePost = async function (subject,content, regionId, postId){
    try {

        const updatePostInfoParams = [subject,content, regionId, postId];

        const connection = await pool.getConnection(async (conn) => conn);

        const PostResult = await userDao.updatePostInfo(connection, updatePostInfoParams);
        console.log(`수정된 게시글 : ${PostResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//상품 수정
exports.updateItem = async function (title,content, regionId, price, categoryId,sellerId,itemId){
    try {

        const updateItemInfoParams = [title,content, regionId, price, categoryId,sellerId,itemId];

        const connection = await pool.getConnection(async (conn) => conn);

        const ItemResult = await userDao.updateItemInfo(connection, updateItemInfoParams);
        console.log(`수정된 상품 : ${ItemResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//게시글 생성
exports.createComment = async function (content,postId, userId,regionId ){
    try {

        const insertCommentInfoParams = [content,postId, userId,regionId];

        const connection = await pool.getConnection(async (conn) => conn);

        const CommentResult = await userDao.insertCommentInfo(connection, insertCommentInfoParams);
        console.log(`추가된 게시글 : ${CommentResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//댓글 수정
exports.updateComments = async function (content,regionId,commentId){
    try {

        const updateCommentInfoParams = [content,regionId,commentId];

        const connection = await pool.getConnection(async (conn) => conn);

        const CommentResult = await userDao.updateCommentInfo(connection, updateCommentInfoParams);
        console.log(`수정된 상품 : ${CommentResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};