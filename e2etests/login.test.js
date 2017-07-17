const webdriver = require('selenium-webdriver');
const chrome = require('chromedriver');
const By = webdriver.By;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('login', function () {
  this.timeout(10000);

  before(function (done) {
    driver.navigate().to('http://localhost:3000')
      .then(() => done());
  });

  it("login in", (done) => {
    driver.findElement(By.name('email')).sendKeys('rachael.njeri@andela.com'),
      driver.findElement(By.name('password')).sendKeys('password'),
      driver.findElement(By.css('.button-line')).click()
      .then(() => done());
  });

  after(function (done) {
    driver.quit()
      .then(() => done());
  });
});


  