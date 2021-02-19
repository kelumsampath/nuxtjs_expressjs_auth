export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },
    getHttpHeaderHash:()=> {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            }
        }
    }
}