import { LOG_IN, START_UP } from "../actions/auth";



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
        default:
            return state;
    }
}

export default authReducer;