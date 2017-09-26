
import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';

describe("Label", () => {

  it("should say Angular", () => {
    browser.get('http://localhost:8080');    
    let e = element(by.tagName('h1'));
    expect(e.getText()).toEqual('Hello Angular');
  });

});

