/**
 * Base Models and Collections.
 * Prepared to be used with PlanetaDelEste.ApiShopaholic OctoberCMS plugin
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 */
import Collection from "./structure/Collection";
import Model from "./structure/Model";
import Base from "./structure/Base";
import File from "./structure/File";
import Request from "./request/Request";
import { toString, trim, isNil } from "lodash";
export { Base, Collection, Model, File, Request };
/**
 * Convert value to string and trim
 * @param {string} sVal
 * @returns {string}
 */
export const cleanStr = (sVal) => {
    if (isNil(sVal)) {
        return null;
    }
    return trim(toString(sVal));
};
//# sourceMappingURL=index.js.map