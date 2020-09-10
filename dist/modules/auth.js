"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const mongoInst_1 = __importDefault(require("../instances/mongoInst"));
// tslint:disable-next-line: no-namespace
var Auth;
(function (Auth) {
    function isTokenLegal(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO HMAC解密實作
            return true;
        });
    }
    Auth.isTokenLegal = isTokenLegal;
    function generateToken(user) {
        const secret = 'abcdefg';
        const hash = crypto_1.default.createHmac('sha256', secret)
            .update('I love cupcakes')
            .digest('hex');
        return {
            hash
        };
    }
    Auth.generateToken = generateToken;
    function isUserExist(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongoInst_1.default.roloUsers.findOne({ account });
            return result;
        });
    }
    Auth.isUserExist = isUserExist;
    function isRegistLegal(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return !(yield Auth.isUserExist(account));
        });
    }
    Auth.isRegistLegal = isRegistLegal;
})(Auth || (Auth = {}));
exports.default = Auth;
//# sourceMappingURL=auth.js.map