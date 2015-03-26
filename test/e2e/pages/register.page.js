'use strict';

var TestKit = require('../test-kit.js');
var UsernameInputPage = require('./username-input.page');
var CreateSubscriptionPage = require('./creators/subscription/create-subscription.page.js');

var testKit = new TestKit();

var RegisterPage = function() {};

RegisterPage.prototype = Object.create({},
{
  emailTextBoxId: { get: function () { return 'registrationData-email'; }},
  usernameTextBoxId: { get: function () { return 'registrationData-username'; }},
  passwordTextBoxId: { get: function () { return 'registrationData-password'; }},
  registerButton: { get: function () { return element(by.id('register-button')); }},
  helpMessages: { get: function () { return element.all(by.css('#registrationForm .help-block')); }},
  nextPageUrl: { get: function () { return new CreateSubscriptionPage().pageUrl; }},
  newEmail: { value: function(username) {
    return username + '@testing.fifthweek.com';
  }},
  registerSuccessfully: { value: function() {
    var username = new UsernameInputPage().newUsername();
    var email = this.newEmail(username);
    var password = 'password1';

    testKit.setValue(this.emailTextBoxId, email);
    testKit.setValue(this.usernameTextBoxId, username);
    testKit.setValue(this.passwordTextBoxId, password);
    this.registerButton.click();

    return {
      username: username,
      email: email,
      password: password
    };
  }}
});

module.exports = RegisterPage;
