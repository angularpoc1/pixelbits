"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
describe("Label", function () {
    it("should say Angular", function () {
        protractor_1.browser.get('http://localhost:8080');
        var e = protractor_1.element(protractor_1.by.tagName('h1'));
        expect(e.getText()).toEqual('Hello Angular');
    });
});
//# sourceMappingURL=test.spec.js.map