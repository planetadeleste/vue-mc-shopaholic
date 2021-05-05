import { Model } from "@planetadeleste/vue-mc";
export default class Auth extends Model {
    options() {
        return {
            methods: {
                check: "POST",
                login: "POST",
                logout: "POST",
                refresh: "POST",
                register: "POST",
                csrf: "GET",
                restore_password: "POST",
                reset_password: "POST",
                check_reset_code: "GET",
            },
        };
    }
    routes() {
        return {
            check: "auth.check",
            login: "auth.login",
            logout: "auth.invalidate",
            refresh: "auth.refresh",
            register: "auth.register",
            csrf: "auth.csrf_token",
            restore_password: "auth.restore_password",
            reset_password: "auth.reset_password",
            check_reset_code: "auth.check_reset_code",
        };
    }
    /**
     * Validate logged user in API
     */
    async check() {
        return await this.createCustomRequest("check");
    }
    /**
     * Get API CSRF code
     */
    async csrf() {
        return await this.createCustomRequest("csrf");
    }
    /**
     * Refresh API token
     */
    async refresh() {
        return await this.createCustomRequest("refresh");
    }
    /**
     * Open auth session in API
     *
     * @param {string} login
     * @param {string} password
     */
    async login(login, password) {
        const data = { email: login, password: password };
        return await this.createCustomRequest("login", data);
    }
    /**
     * Close (invalidate) session from API
     */
    async logout() {
        const sToken = localStorage.getItem("access_token");
        const data = { token: sToken };
        if (!sToken) {
            return Promise.reject("token_not_provided");
        }
        return await this.createCustomRequest("logout", data);
    }
    /**
     * Register user
     *
     * @param {Record<string, any>} obData
     */
    async register(obData) {
        return await this.createCustomRequest("register", obData);
    }
    /**
     * Request restore password (forget password)
     *
     * @param {string} sEmail User email
     */
    async restorePassword(sEmail) {
        return await this.createCustomRequest("restore_password", {
            email: sEmail,
        });
    }
    /**
     * After receive restore password code, proceed to reset password with a new one
     *
     * @param {string} sCode Code to reset password, received by email
     * @param {string} sPass New password
     * @param {string} sPassConfirm Confirmation password, must be the same of password
     */
    async resetPassword(sCode, sPass, sPassConfirm) {
        const obData = {
            slug: sCode,
            password: sPass,
            password_confirmation: sPassConfirm,
        };
        return await this.createCustomRequest("register", obData);
    }
    /**
     * Validate received code to reset password
     *
     * @param {string} sCode Code to reset password, received by email
     */
    async checkResetCode(sCode) {
        const obData = { slug: sCode };
        return await this.createCustomRequest("check_reset_code", obData);
    }
}
//# sourceMappingURL=Auth.js.map