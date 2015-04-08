var SignOutPage = require('../../pages/sign-out.page.js');
var RegisterPage = require('../../pages/register.page.js');
var CreateBlogPage = require('../../pages/creators/create-blog.page.js');
var HeaderPage = require('../../pages/header.page.js');
var SidebarPage = require('../../pages/sidebar.page.js');

describe('create blog page', function() {
  'use strict';

  var header = new HeaderPage();
  var sidebar = new SidebarPage();
  var signOutPage = new SignOutPage();
  var registerPage = new RegisterPage();
  var page = new CreateBlogPage();

  it('should run once before all', function() {
    signOutPage.signOutAndGoHome();
    registerPage.registerSuccessfully();
  });

  describe('header', function() {

    it('should contain title', function() {
      expect(header.title.getText()).toContain('About Your Blog'.toUpperCase());
    });
  });

  describe('sidebar', function() {

    it('should contain 4 links', function () {
      expect(sidebar.links.count()).toBe(4);
    });

    it('should contain "Home" link', function () {
      expect(sidebar.dashboardLink.isDisplayed()).toBe(true);
    });

    it('should contain highlighted link for current page', function () {
      expect(sidebar.createBlogLink.getAttribute('class')).toContain('active');
    });

    it('should contain "Settings" link', function () {
      expect(sidebar.accountLink.isDisplayed()).toBe(true);
    });

    it('should contain "Help" link', function () {
      expect(sidebar.helpLink.isDisplayed()).toBe(true);
    });
  });
});
