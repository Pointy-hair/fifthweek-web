'use strict';

var CreatorLandingPagePage = function() {};

CreatorLandingPagePage.prototype = Object.create({}, {
  fifthweekLink: { get: function() { return element(by.css('.fifthweek-logo-sm')); }},
  editPageLink: { get: function() { return element(by.id('edit-header-link')); }},
  subscribeButton: { get: function() { return element(by.id('subscribe-button')); }},
  channelListSubscribeButton: { get: function() { return element(by.id('channel-list-subscribe-button')); }},
  unsubscribeButton: { get: function() { return element(by.id('unsubscribe-button')); }},
  updateSubscriptionButton: { get: function() { return element(by.id('update-subscriptions-button')); }},
  manageSubscriptionButton: { get: function() { return element(by.id('manage-subscription-button')); }},
  cancelChangesButton: { get: function() { return element(by.id('cancel-changes-button')); }},
  moreInfo: { get: function () { return element(by.id('more-info')); }},
  video: { get: function () { return element(by.css('#video iframe')); }},
  fullDescription: { get: function () { return element(by.id('full-description')); }},
  getChannel: { value: function (index) { return element(by.id('channel-' + index)); }},
  getChannelPrice: { value: function (index) { return element(by.id('channel-price-' + index)); }},
  getChannelPreviousPrice: { value: function (index) { return element(by.id('channel-previous-price-' + index)); }},
  channelCount: { get: function () { return element.all(by.css('.channels .channel')).count(); }},
  channelListTotalPrice: { get: function() { return element(by.css('.subscribe-now-total')); }},
  guestListInformationPanel: { get: function() { return element(by.css('.guest-list-information')); }},
  guestListInformationPanelCount: { get: function() { return element.all(by.css('.guest-list-information')).count(); }},
  buttonFooter: { get: function() { return element(by.css('.button-footer')); }},

  expectSubscribedSuccessfully: { value: function(){
    expect(this.manageSubscriptionButton.isDisplayed()).toBe(true);
  }},

  expectPriceIncrease: { value: function(index, from, to) {
    expect(this.getChannelPreviousPrice(index).getText()).toBe('Increased from $' + Number(from).toFixed(2) + '/week');
    expect(this.getChannelPrice(index).getText()).toBe('$' + Number(to).toFixed(2) + '/week');
  }},
  expectPriceDecrease: { value: function(index, from, to) {
    expect(this.getChannelPreviousPrice(index).getText()).toBe('Decreased from $' + Number(from).toFixed(2) + '/week');
    expect(this.getChannelPrice(index).getText()).toBe('$' + Number(to).toFixed(2) + '/week');
  }},

});

module.exports = CreatorLandingPagePage;
