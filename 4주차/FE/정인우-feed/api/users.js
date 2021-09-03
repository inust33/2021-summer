import axios from "axios";

const api = axios.create({
    baseURL: "http://ec2-3-35-207-100.ap-northeast-2.compute.amazonaws.com:3000",
});

const singUp = ({id,password})=>api.post('/users/sign-up', {id, password});
const logIn = ({id, password}) => api.post('/users/sign-in', {id,password});
const getFeeds  = ()=> api.get('/posts');
const addFeed = ({userId, title, content})=> api.post('/posts', {userId, title, content});
const editFeed = ({title, content})=> api.put('/posts/:postId', {title, content});
const deleteFeed = ()=>api.delete('/posts/:postId');

const logIn =