/* eslint-disable no-unused-expressions */
/* globals describe, beforeEach, afterEach, it */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
// const ui = require('../utils/ui');
// const itemsUtils = require('../utils/bouquets-utils');

const async = require('../../utils/async');
const { Builder, By, until, WebDriver } = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('Public routes test', () => {

    const baseUrl = 'http://localhost:3002';
    let driver = null;
    //new Builder().usingServer('http://localhost:4444/wd/hub').forBrowser('chrome').build();
    test.before(() => {
        driver = new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .forBrowser('chrome')
            .build();
    });

    test.it('Home page elements', () => {
        driver.get(baseUrl);
        driver.findElement(By.id('shopTitle'))
            .then((ekl) => {
                return ekl.getText();
            })
            .then((text) => {
                expect(text, 'Message is wrong')
                    .to.include('Магазин за цветя "Виктория"');
            });
        driver.findElements(By.css('#topNew .productBoxHeight'))
            .then((topProducts) => {
                expect(topProducts.length, 'top products container')
                    .to.be.equal(6);
            });
        driver.findElements(By.css('#myCarousel .item'))
            .then((carouselItems) => {
                expect(carouselItems.length).to.be.equal(3);
            });
    });

    test.it('Expect page to show not products found message', () => {
        driver.get(baseUrl + '/products/cards');
        driver.findElement(By.css('.products-content h2.text-center'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                return el.getText();
            })
            .then((text) => {
                expect(text.trim())
                    .to.equal('Няма продукти по зададените критерии');
            });
    });

    test.after(() => {
        driver.quit();
    });
});
