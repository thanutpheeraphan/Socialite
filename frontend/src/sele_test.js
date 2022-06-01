// import ReactDOM, { render } from "react-dom";
// import { mock } from "jest";
// import { renderToDOM } from "./index";
// import App from "./App";
// import { screen, configure } from "@testing-library/react";
// import { waitForElementToBeRemoved } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Experimental_CssVarsProvider } from "@mui/material";
// import Navbar from "./components/Navbar/Navbar";
// import Home from "./pages/Home";
// import MCURoom from "./components/MCURoom/MCURoom";

var webdriver = require("selenium-webdriver");
const By = webdriver.By;
let browser = new webdriver.Builder();
let tab = browser.forBrowser("firefox").build();
let { email, pass, username } = require("./credential.json");
let tabToOpen = tab.get("localhost:3000/signup");
tabToOpen
  .then(function () {
    let findTimeOutP = tab.manage().setTimeouts({
      implicit: 10000,
    });
    return findTimeOutP;
  })
  .then(function () {
    let promiseUsernameBox = tab.findElement(webdriver.By.css(".email"));
    return promiseUsernameBox;
  })
  .then(function (usernameBox) {
    let promiseFillUsername = usernameBox.sendKeys(email);
    return promiseFillUsername;
  })
  .then(function () {
    console.log("Email entered successfully");
    let promisePasswordBox = tab.findElement(webdriver.By.css(".password"));
    return promisePasswordBox;
  })
  .then(function (passwordBox) {
    let promiseFillPassword = passwordBox.sendKeys(pass);
    return promiseFillPassword;
  })
  .then(function () {
    console.log("password entered");
    let promiseNameBox = tab.findElement(webdriver.By.name("name"));
    return promiseNameBox;
  })
  .then(function (nameBox) {
    let promiseFillName = nameBox.sendKeys(username);
    return promiseFillName;
  })
  .then(function () {
    console.log("Name entered");
    let promiseRegisBtn = tab.findElement(webdriver.By.css(".register-btn"));
    return promiseRegisBtn;
  })
  .then(function (regisBtn) {
    let promiseClickRegis = regisBtn.click();
    return promiseClickRegis;
  })
  .then(function () {
    console.log("success");
  });
// browser
//   .navigate()
//   .to("https://socialite-app-22.herokuapp.com/")
//   .then(() => browser.findElement);
// const USelement = browser.findElement(By.name("email"));
// USelement.sendKeys("test3@gmail.com");

// const PWelement = browser.findElement(By.name("password"));
// PWelement.sendKeys("test3");

// browser.findElement(By)

// var promise = browser.getTitle();
// promise.then(function (title) {
//   console.log(title);
// });

// browser.manage().timeouts().setScriptTimeout(10);
// browser.quit();

// const webdriver = require("selenium-webdriver");
// const driver = new webdriver.Builder().forBrowser("firefox").build();
// // Instantiate a web browser page
// driver.navigate().to("Yahoo");

// const By = webdriver.By; // useful Locator utility to describe a query for a WebElement
// driver
//   .navigate()
//   .to("Yahoo")
//   .then(() => driver.findElement(By.css("#login-username")))
//   .then((element) => element.getAttribute("value"))
//   .then((value) => console.log(value));

// driver
//   .navigate()
//   .to("Yahoo")
//   .then(() => driver.findElement(By.css("#login-username")))
//   .then((element) => element.getAttribute("value"))
//   .then((value) => console.log(value));
// const until = webdriver.until; // useful utility to wait command
// driver
//   .navigate()
//   .to("Yahoo")
//   .then(() =>
//     driver.findElement(By.css("#login-username")).sendKeys("xyz@yahoo.com")
//   )
//   .then(() => driver.wait(until.elementLocated(By.css("#login-signin"))))
//   .then(() => driver.findElement(By.css("#login-signin")).click());

// describe("test ReactDOM.render", () => {
//   const originalRender = ReactDOM.render;
//   const originalGetElement = global.document.getElementById;
//   beforeEach(() => {
//     global.document.getElementById = () => true;
//     ReactDOM.render = jest.fn();
//   });
//   afterAll(() => {
//     global.document.getElementById = originalGetElement;
//     ReactDOM.render = originalRender;
//   });
//   it("should call ReactDOM.render", () => {
//     renderToDOM();
//     expect(ReactDOM.render).toHaveBeenCalled();
//   });
// });

// .test("render:", async () => {
//   render(<Home />);
// });
