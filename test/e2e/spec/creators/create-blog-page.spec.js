var SignOutPage = require('../../pages/sign-out.page.js');
var RegisterPage = require('../../pages/register.page.js');
var CreateBlogPage = require('../../pages/creators/create-blog.page.js');
var HeaderPage = require('../../pages/header-create-channel.page.js');
var SidebarPage = require('../../pages/sidebar.page.js');

describe('create blog page', function() {
  'use strict';

  var header = new HeaderPage();
  var sidebar = new SidebarPage();
  var signOutPage = new SignOutPage();
  var registerPage = new RegisterPage();

  it('should run once before all', function() {
    registerPage.signOutAndGoToRegistration();
    registerPage.registerSuccessfully();
  });

  header.includeBasicTests(header.createChannelLink);

  sidebar.includeNewCreatorTests(sidebar.createChannelLink);
});
