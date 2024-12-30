import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state() {
        return {
            user: null,
            authToken: null,
            roles: [],
        }
    },

    // Get user, roles, and token
    getters: {
        // Verify if user is authenticated and has a valid token. If so, return user object. Otherwise, return null.
        async getUser() {
            let token = state.authToken;
            if (!token) {
                return null;
            }
            const response = await axios.post('api/auth/verifyjwt', {
                token,
            });
            if (response.status !== 200) {
                state.authToken = null;
                return null;

            }
            state.user = jwtDecode(token);
            state.roles = state.user.roles;
            state.authToken = token;
            return state.user;
        },
    },
});

