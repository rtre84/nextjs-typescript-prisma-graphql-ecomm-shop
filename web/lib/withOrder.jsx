"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
var querystring_1 = require("querystring");
var react_1 = require("react");
var GetOrderQuery_1 = require("../queries/GetOrderQuery");
var withData_1 = require("./withData");
var createOrder = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation createOrder {\n    createOrder {\n      id\n    }\n  }\n"], ["\n  mutation createOrder {\n    createOrder {\n      id\n    }\n  }\n"])));
function getBrowserCookie(name) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp('' + name + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
}
exports.getBrowserCookie = getBrowserCookie;
function getOrderId(ctx) {
    if (!ctx.isBrowser) {
        return ctx.req.cookies.orderId;
    }
    return getBrowserCookie('orderId');
}
function saveOrderId(orderId, _a) {
    var isBrowser = _a.isBrowser, res = _a.res;
    if (!isBrowser) {
        res.cookie('orderId', orderId);
        return;
    }
    var cookies = __assign({}, querystring_1.default.parse(document.cookie), { orderId: orderId });
    document.cookie = querystring_1.default.stringify(cookies);
}
exports.saveOrderId = saveOrderId;
/**
 * Tries to read order id from cookie
 * Creates new order if order can't be found or order can't be fetched
 */
function getOrCreateOrderId(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var orderId, apollo, getSavedOrderResult, createOrderResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = getOrderId(ctx);
                    apollo = ctx.apollo;
                    if (!orderId) return [3 /*break*/, 2];
                    return [4 /*yield*/, apollo.query({
                            query: GetOrderQuery_1.GetOrderQueryAST,
                            variables: {
                                id: orderId,
                            },
                        })];
                case 1:
                    getSavedOrderResult = _a.sent();
                    if (getSavedOrderResult.data.order) {
                        saveOrderId(orderId, ctx);
                        return [2 /*return*/, orderId];
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, apollo.mutate({
                        mutation: createOrder,
                        variables: {},
                    })];
                case 3:
                    createOrderResult = _a.sent();
                    orderId = createOrderResult.data.createOrder.id;
                    saveOrderId(orderId, ctx);
                    return [2 /*return*/, orderId];
            }
        });
    });
}
exports.getOrCreateOrderId = getOrCreateOrderId;
exports.default = (function (ComposedComponent) {
    var WithOrder = /** @class */ (function (_super) {
        __extends(WithOrder, _super);
        function WithOrder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithOrder.getInitialProps = function (ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var orderId, composedInitialProps;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getOrCreateOrderId(ctx)];
                        case 1:
                            orderId = _a.sent();
                            composedInitialProps = {};
                            if (!ComposedComponent.getInitialProps) return [3 /*break*/, 3];
                            return [4 /*yield*/, ComposedComponent.getInitialProps(__assign({}, ctx, { orderId: orderId }))];
                        case 2:
                            composedInitialProps = _a.sent();
                            _a.label = 3;
                        case 3: 
                        // next.js handles adding `url` etc to props
                        return [2 /*return*/, __assign({ orderId: orderId }, composedInitialProps)];
                    }
                });
            });
        };
        WithOrder.prototype.render = function () {
            return <ComposedComponent {...this.props}/>;
        };
        WithOrder.displayName = "WithOrder(" + withData_1.getComponentDisplayName(ComposedComponent) + ")";
        return WithOrder;
    }(react_1.Component));
    return withData_1.default(WithOrder);
});
var templateObject_1;
