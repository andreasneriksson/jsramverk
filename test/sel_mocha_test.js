"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const By = require("selenium-webdriver").By;
const firefox = require('selenium-webdriver/firefox')

let browser;

// Test Suite
test.describe("Test Me-page", function() {

    test.beforeEach(function(done) {
        this.timeout(30000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser("firefox")
            .build();

        browser.get("http://me-app.andreasneriksson.me/reports/week/1");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function assertInput() {
        browser.findElement(By.css("input[name='email']")).click();
    }

    // Test case reports/week/1
    test.it("Test reports/week/1", function(done) {

        // Check title
        browser.getTitle().then(function(title) {
            assert.equal(title, "React App");
        });

        // Check heading
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Kursmoment 1");
            });
        });

        // Check URL ending
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("reports/week/1"));
        });

        done();
    });

    // Test case register
    test.it("Test go to register page", function (done) {
        goToNavLink("Registrera");
        matchUrl("/register");
        assertH1("Registrera användare");
        done();
    });

    // Test case login
    test.it("Test go to login page and click on email input", function (done) {
        goToNavLink("Logga in");
        matchUrl("/login");
        assertInput();
        done();
    });
});