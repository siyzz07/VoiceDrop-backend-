"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["OK"] = 200] = "OK";
    StatusEnum[StatusEnum["CREATED"] = 201] = "CREATED";
    StatusEnum[StatusEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusEnum[StatusEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusEnum[StatusEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusEnum[StatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusEnum[StatusEnum["CONFLICT"] = 409] = "CONFLICT";
    StatusEnum[StatusEnum["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
