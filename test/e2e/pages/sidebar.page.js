'use strict';

var SidebarPage = function() {};

SidebarPage.prototype = Object.create({}, {
  sidebar: { get: function () { return element(by.id('sidebar')); }},
  links: { get: function () { return element.all(by.css('#sidebar ul a')); }},
  signInLink: { get: function () { return element(by.id('navigation-sign-in')); }},
  registerLink: { get: function () { return element(by.id('navigation-register')); }},
  createSubscriptionLink: { get: function () { return element(by.id('navigation-create-subscription')); }},
  dashboardLink: { get: function () { return element(by.id('navigation-home')); }},
  landingPageLink: { get: function () { return element(by.id('navigation-landing-page')); }},
  postsLink: { get: function () { return element(by.id('navigation-posts')); }},
  collectionsLink: { get: function () { return element(by.id('navigation-collections')); }},
  channelsLink: { get: function () { return element(by.id('navigation-channels')); }},
  accountLink: { get: function () { return element(by.id('navigation-account')); }},
  helpLink: { get: function () { return element(by.id('navigation-help')); }},
  includeEstablishedCreatorTests: { value: function(highlightedLink) {
    var self = this;

    describe('sidebar', function() {
      it('should contain the correct number of links', function () {
        expect(self.links.count()).toBe(7);
      });

      it('should contain "Home" link', function () {
        expect(self.dashboardLink.isDisplayed()).toBe(true);
      });

      it('should contain "Landing Page" link', function () {
        expect(self.landingPageLink.isDisplayed()).toBe(true);
      });

      it('should contain "Posts" link', function () {
        expect(self.postsLink.isDisplayed()).toBe(true);
      });

      it('should contain "Collections" link', function () {
        expect(self.collectionsLink.isDisplayed()).toBe(true);
      });

      it('should contain "Channels" link', function () {
        expect(self.channelsLink.isDisplayed()).toBe(true);
      });

      it('should contain "Account" link', function () {
        expect(self.accountLink.isDisplayed()).toBe(true);
      });

      it('should contain "Help" link', function () {
        expect(self.helpLink.isDisplayed()).toBe(true);
      });

      if(highlightedLink){
        it('should highlight the current area', function () {
          expect(highlightedLink.getAttribute('class')).toContain('active');
        });
      }
    });
  }}
});

module.exports = SidebarPage;
