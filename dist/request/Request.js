import { Request as RequestBase } from "vue-mc";
import { Base } from "../";
export default class Request extends RequestBase {
    /**
     * @returns {Promise}
     */
    send() {
        return Base.$http
            .request(this.config)
            .then(this.createResponse)
            .catch((error) => {
            throw this.createError(error);
        });
    }
}
//# sourceMappingURL=Request.js.map