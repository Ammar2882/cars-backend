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
exports.sendEmail = void 0;
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
sib_api_v3_sdk_1.default.ApiClient.instance.authentications['api-key'].apiKey = 'xkeysib-74c214a89e8fc8f0a7596148b16ee9cdea87860f3d0697e5fa4acc2acad4ebcf-FfXI0szHCYeQg1Qp7';
const sendEmail = (email, user, text) => __awaiter(void 0, void 0, void 0, function* () {
    new sib_api_v3_sdk_1.default.TransactionalEmailsApi().sendTransacEmail({
        subject: 'Password',
        sender: { email: 'carsdirectory@gmail.com', name: 'Cars Directory' },
        to: [{ name: user, email: email }],
        htmlContent: '<html><body><h1>Your Password is {{params.bodyMessage}}</h1></body></html>',
        params: { bodyMessage: text }
    }).then(function (data) {
        console.log(data);
    }, function (error) {
        console.error(error);
    });
});
exports.sendEmail = sendEmail;
