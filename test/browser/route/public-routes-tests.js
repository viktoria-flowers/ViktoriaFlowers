/* eslint-disable no-unused-expressions */
/* globals describe, beforeEach, afterEach, it */

const { expect } = require('chai');
const { Builder, By, until } = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

describe('Public routes test', () => {
    const ensurePageContent = (source) => {
        // verify the correct page content is visible
        const index = source.indexOf('.error-template', '');
        expect(index, '"Not found" page shown').to.be.equal(-1);
    };

    const checkRoute = (webDriver, route, breadCrumbText) => {
        const prodsMenu = webDriver.findElement(By.css('.dropdown'));
        prodsMenu.click();
        const selector = 'a[href="' + route + '"]';
        const circleProds = webDriver.findElement(By.css(selector));
        circleProds.click();

        webDriver.wait(until.urlContains(route), 2000);
        driver.getPageSource().then(ensurePageContent);

        const breadCrumb = driver.findElement(By.css('.breadcrumb'));
        breadCrumb.getText()
            .then((text) => {
                const err = `Expect ${text} to contains ${breadCrumbText}`;
                expect(text.indexOf(breadCrumbText), err)
                    .to.not.be.equal(-1);
            });
    };

    const baseUrl = 'http://localhost:3002';
    let driver = null;
    test.before(() => {
        driver = new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .forBrowser('chrome')
            .build();
    });

    test.it('Home page elements', (done) => {
        driver.get(baseUrl);
        driver.findElement(By.id('shopTitle'))
            .then((ekl) => {
                return ekl.getText();
            })
            .then((text) => {
                expect(text, 'Message is wrong')
                    .to.include('Магазин за цветя "Виктория"');
            })
            .catch((err) => {
                return done(err);
            });
        driver.findElements(By.css('#topNew .productBoxHeight'))
            .then((topProducts) => {
                expect(topProducts.length, 'top products container')
                    .to.be.equal(6);
            })
            .catch((err) => {
                return done(err);
            });
        driver.findElements(By.css('#myCarousel .item'))
            .then((carouselItems) => {
                expect(carouselItems.length).to.be.equal(3);
            })
            .catch((err) => {
                return done(err);
            });

        done();
    });

    test.it('Expect page to show not products found message', (done) => {
        driver.get(baseUrl + '/products/cards');
        driver.findElement(By.css('.products-content h2.text-center'))
            .then((el) => {
                expect(el).to.not.be.undefined;
                return el.getText();
            })
            .then((text) => {
                expect(text.trim())
                    .to.equal('Няма продукти по зададените критерии');
            })
            .catch((err) => {
                return done(err);
            });

        done();
    });

    test.it('Expect to sort products by price', () => {
        driver.get(baseUrl + '/products');
        const ddl = driver.findElement(By.id('sort'));
        ddl.click().then(() => {
            const priceItem = driver.findElement(By.css('option[value=price]'));
            priceItem.click();
        });

        const ajaxWait = driver.executeScript('return $.active === 0;');
        ajaxWait.then((value) => {
            return value;
        });

        driver.wait(ajaxWait, 10 * 1000);

        driver.findElements(By.css('.products-content span.prodPrice'))
            .then((prices) => {
                prices = prices.map((value) => {
                    return +value;
                });

                expect(prices.length, 'Prices have too small length')
                    .to.be.equal(12);

                for (let i = 0; i < prices.length - 1; i++) {
                    expect(prices[i] <= prices[i + 1], 'Prices are not sorted');
                }
            })
            .catch((err) => {
                throw err;
            });
    });


    test.it('Expect to show circle products from navigation', () => {
        driver.get(baseUrl);

        checkRoute(driver, '/products/circle', 'Кръгли');
    });

    test.it('Expect to show tall products from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/products/tall', 'Високи');
    });

    test.it('Expect to show wedding products from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/products/wedding', 'Сватбени');
    });

    test.it('Expect to show extraordinary products from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/products/extraordinary', 'Нестандартни');
    });

    test.it('Expect to show pots products from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/products/pots', 'Саксии');
    });

    test.it('Expect to show cards products from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/products/cards', 'Картички');
    });

    test.it('Expect to show baskets products from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/products/baskets', 'Кошници');
    });

    test.it('Expect to show delivery page from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/delivery', 'Доставка');
    });

    test.it('Expect to show payment page from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/payment', 'Начини на плащане');
    });

    test.it('Expect to show contacts page from navigation', () => {
        driver.get(baseUrl);
        checkRoute(driver, '/contacts', 'Контакти');
    });

    test.it('Expect to show pay on delivery page from navigation', () => {
        driver.get(baseUrl + '/payOnDelivery');
        driver.wait(until.urlContains('/payOnDelivery'), 2000);
        driver.getPageSource().then(ensurePageContent);

        const breadCrumb = driver.findElement(By.css('.breadcrumb'));
        breadCrumb.getText()
            .then((text) => {
                const breadCrumbText = 'Наложен платеж';
                const err = `Expect ${text} to contains ${breadCrumbText}`;
                expect(text.indexOf(breadCrumbText), err)
                    .to.not.be.equal(-1);
            });
    });

    test.it('Expect to show card payment page from navigation', () => {
        driver.get(baseUrl + '/card-payment');
        driver.wait(until.urlContains('/card-payment'), 2000);
        driver.getPageSource().then(ensurePageContent);

        const breadCrumb = driver.findElement(By.css('.breadcrumb'));
        breadCrumb.getText()
            .then((text) => {
                const breadCrumbText = 'Плащане с Кредитна дебитна карта';
                const err = `Expect ${text} to contains ${breadCrumbText}`;
                expect(text.indexOf(breadCrumbText), err)
                    .to.not.be.equal(-1);
            });
        const message = driver.findElement(By.css('.container h3'));
        message.getText()
            .then((text) => {
                /* eslint-disable max-len */
                const expectedMsg = 'Тази функционалност не е налична към момента. Очаквайте скоро...';
                expect(text.indexOf(expectedMsg)).is.not.equal(-1);
            });
    });

    test.it('Expect to show paypal page from navigation', () => {
        driver.get(baseUrl + '/paypal-payment');
        driver.wait(until.urlContains('/paypal-payment'), 2000);
        driver.getPageSource().then(ensurePageContent);

        const breadCrumb = driver.findElement(By.css('.breadcrumb'));
        breadCrumb.getText()
            .then((text) => {
                const breadCrumbText = 'Плащане с PayPal';
                const err = `Expect ${text} to contains ${breadCrumbText}`;
                expect(text.indexOf(breadCrumbText), err)
                    .to.not.be.equal(-1);
            });

        const message = driver.findElement(By.css('.container h3'));
        message.getText()
            .then((text) => {
                /* eslint-disable max-len */
                const expectedMsg = 'Тази функционалност не е налична към момента. Очаквайте скоро...';
                expect(text.indexOf(expectedMsg)).is.not.equal(-1);
            });
    });

    test.after(() => {
        driver.quit();
    });
});
