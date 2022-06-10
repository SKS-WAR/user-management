const Auth = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    authenticate(token,user) {
        this.isAuthenticated = true;
        // cb();
    },
    signout(cb) {
        localStorage.clear();
        this.isAuthenticated = false;
        cb();
    }
}

export default Auth;