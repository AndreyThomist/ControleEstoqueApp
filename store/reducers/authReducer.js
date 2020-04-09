import { LOG_IN, LOG_OUT, AUTHENTICATE } from "../actions/auth";



const initialState = {
    token: '',
    expiresIn: '',
    email: '',
    userId: ''
}

const authReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case LOG_IN:
            return {
                token: actions.data.token,
                expiresIn: new Date().getTime() + actions.data.expiresIn * 1000,
                email: actions.data.email,
                userId: actions.data.userId
            }
        case AUTHENTICATE:
            return JSON.parse(actions.auth)
        case LOG_OUT:
            return {
                token: null,
                expiresIn: null,
                email: null,
                userId: null
            };
        default:
            return state;
    }
}

export default authReducer;