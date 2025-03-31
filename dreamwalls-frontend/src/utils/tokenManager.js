// Token management utility
const TOKEN_KEY = 'token';

export const tokenManager = {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
        // Also set a timestamp for when the token was stored
        localStorage.setItem('tokenTimestamp', Date.now().toString());
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('tokenTimestamp');
    },

    isTokenValid() {
        const token = this.getToken();
        const timestamp = localStorage.getItem('tokenTimestamp');
        
        if (!token || !timestamp) {
            return false;
        }

        // Check if token is older than 24 hours (or your preferred expiry time)
        const tokenAge = Date.now() - parseInt(timestamp);
        const tokenMaxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        return tokenAge < tokenMaxAge;
    }
}; 