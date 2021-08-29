import {v4 as uuid} from 'uuid';
import {ADD_User, ADD_Feed, DELETE_Feed, UPDATE_Feed, EDIT_Feed, CANCEL, LOGIN} from './Actions';

export const initialState = {
    Users: [
        {
            email: 'inust',
            password: '12345678',
            Joined_Date: new Date('2021-08-18'),
        }
    ],
    Feeds: [
        {
            id: 1,
            author: 'inust',
            text: '안녕하세요! 첫번째 피드입니다.',
            date: new Date('2021-08-24 10:30:00'),

        }
    ],
    Selected_Feed: -1
}


const reducer = (state, action) => {
    switch (action.type) {
        case ADD_User:
            const {payload: {email, password}} = action;
            return {
                ...state,
                Users: [...state.Users, {
                    email,
                    password,
                    Joined_Date: new Date()
                }]
            };

        case ADD_Feed:
            const {payload: {author, text}} = action;
            return {
                ...state,
                Feeds: [...state.Feeds, {id: uuid(), author, text, date: new Date()}]
            }
        case DELETE_Feed:
            return {...state, Feeds: state.Feeds.filter(feed => feed.id !== action.payload)};

        case EDIT_Feed:
            const selected = state.Feeds.find(feed => feed.id === action.payload);
            return {...state, Selected_Feed: selected.id}
        case UPDATE_Feed:
            const {Feeds, Selected_Feed} = state;
            const newFeeds = [...Feeds];
            const newFeed = newFeeds.find(feed => feed.id === Selected_Feed)
            newFeed.text = action.payload;
            return {Feeds: newFeeds, Selected_Feed: -1}
        case CANCEL:
            return {...state, Selected_Feed: -1};
        default:
            throw new Error();
    }
}

export default reducer;
