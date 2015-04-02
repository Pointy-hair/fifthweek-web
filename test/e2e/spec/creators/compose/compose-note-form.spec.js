var TestKit = require('../../../test-kit.js');
var CommonWorkflows = require('../../../common-workflows.js');
var SidebarPage = require('../../../pages/sidebar.page.js');
var TargetPage = require('../../../pages/creators/compose/compose-note.page.js');
var DateTimePickerPage = require('../../../pages/date-time-picker.page.js');
var ComposeOptionsPage = require('./compose-options.page.js');

describe('compose note form', function() {
  'use strict';

  var registration;
  var subscription;

  var commonWorkflows = new CommonWorkflows();
  var sidebar = new SidebarPage();
  var page = new TargetPage();
  var testKit = new TestKit();
  var dateTimePickerPage = new DateTimePickerPage();
  var composeOptions = new ComposeOptionsPage();

  var channelNames;

  var navigateToPage = function() {
    sidebar.postsLink.click();
    composeOptions.noteLink.click();
    browser.waitForAngular();
  };

  var createChannel = function(){
    var result = commonWorkflows.createChannel();
    channelNames.push(result.name);
    navigateToPage();
  };

  var verifySuccess = function(successMessage){
    expect(page.successMessage.isDisplayed()).toBe(true);
    expect(page.successMessage.getText()).toBe(successMessage);
    expect(page.postAnotherButton.isDisplayed()).toBe(true);

    page.postAnotherButton.click();

    expect(page.postNowButton.isDisplayed()).toBe(true);
  };

  var postNow = function(channelIndex){
    it('should post a note to channel ' + channelIndex, function(){
      var channelName = channelNames[channelIndex];
      page.postNow(channelName);
      verifySuccess('Posted successfully');
    });
  };

  var postOnDate = function(channelIndex){
    it('should schedule a note to channel' + channelIndex, function(){
      var channelName = channelNames[channelIndex];
      page.postOnDate(channelName);
      verifySuccess('Scheduled successfully');
    });
  };

  beforeEach(function(){
    channelNames = [undefined];  // Set initial default channel name to undefined.
  });

  describe('workflows', function(){
    beforeEach(function(){
      var context = commonWorkflows.createSubscription();
      registration = context.registration;
      subscription = context.subscription;
      navigateToPage();
    });

    describe('when posting now', function(){

      describe('when creator has one channel', function(){
        postNow(0);
      });

      describe('when creator has two channels', function(){

        beforeEach(function(){
          createChannel();
        });

        postNow(1);
      });
    });

    describe('when posting later', function(){

      describe('when creator has one channel', function(){
        postOnDate(0);
      });

      describe('when creator has two channels', function(){

        beforeEach(function(){
          createChannel();
        });

        postOnDate(1);
      });
    });
  });

  describe('when validating inputs', function() {

    it('should run once before all', function() {
      var context = commonWorkflows.createSubscription();
      registration = context.registration;
      subscription = context.subscription;
      navigateToPage();
    });

    describe('happy path', function(){

      describe('when posting now', function(){
        afterEach(function(){
          page.postNowButton.click();
          expect(page.successMessage.isDisplayed()).toBe(true);

          page.postAnotherButton.click();
        });

        it('should allow symbols in the content', function(){
          testKit.setValue(page.contentTextBoxId, testKit.punctuation33);
        });

        it('should allow numbers in the content', function(){
          testKit.setValue(page.contentTextBoxId, '0123456789');
        });
      });

      describe('when posting to backlog', function(){
        beforeEach(function(){
          testKit.setValue(page.contentTextBoxId, '0123456789');
          page.postLaterButton.click();
        });

        afterEach(function(){
          page.postToBacklogButton.click();
          expect(page.successMessage.isDisplayed()).toBe(true);

          page.postAnotherButton.click();
        });

        dateTimePickerPage.includeHappyPaths(function() {});
      });
    });

    describe('sad path', function() {

      it('should run once before all', function() {
        var context = commonWorkflows.createSubscription();
        registration = context.registration;
        subscription = context.subscription;
        navigateToPage();
      });

      describe('when testing date time picker', function(){

        it('should run once before all', function() {
          testKit.setValue(page.contentTextBoxId, '0123456789');
          page.postLaterButton.click();
        });

        dateTimePickerPage.includeSadPaths(page.postToBacklogButton, page.helpMessages, function() {});

        it('should run once after all', function(){
          commonWorkflows.fastRefresh();
        });
      });

      describe('when testing note', function(){
        afterEach(function(){
          commonWorkflows.fastRefresh();
        });

        it('should not allow a note with more than 280 characters', function(){
          var maxLength = 280;
          var overSizedValue = new Array(maxLength + 2).join( 'a' );
          testKit.setValue(page.contentTextBoxId, overSizedValue, true);

          testKit.assertMaxLength(page.helpMessages, page.contentTextBoxId, overSizedValue, maxLength);
        });

        it('should not allow an empty note', function(){
          testKit.clear(page.contentTextBoxId);
          page.postNowButton.click();

          testKit.assertSingleValidationMessage(page.helpMessages,
            'Please write your note before continuing.');
        });

        it('should not allow an empty note when posting later', function(){
          testKit.clear(page.contentTextBoxId);
          page.postLaterButton.click();

          testKit.assertSingleValidationMessage(page.helpMessages,
            'Please write your note before continuing.');
        });
      });
    });
  });
});
