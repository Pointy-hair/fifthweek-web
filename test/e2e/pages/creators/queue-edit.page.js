'use strict';

var _ = require('lodash');
var TestKit = require('../../test-kit.js');
var QueueNameInputPage = require('../queue-name-input.page.js');

var testKit = new TestKit();
var queueNameInputPage = new QueueNameInputPage();

var QueueEditPage = function() {};

QueueEditPage.prototype = Object.create({}, {
  pageUrl: { get: function () { return '/creator/queues/'; }},
  nameTextBoxId: { value: 'model-name' },
  daySelectId: { get: function() { return 'day-of-week'; }},
  hourSelectId: { get: function() { return 'hour-of-day'; }},
  inputs: { value: function() { return [
    {
      name: 'nameTextBox',
      newValue: function() { return queueNameInputPage.newName(); }
    }
  ]; }},
  defaultReleaseTime: { get: function() { return { daySelect:'Monday', hourSelect: '00:00' }; } },
  releaseTimeInputs: { get: function() { return [
    {
      name: 'daySelect',
      newValue: function() { return [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ][Math.round(Math.random() * 6)]; }
    },
    {
      name: 'hourSelect',
      newValue: function() { return [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
        '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
      ][Math.round(Math.random() * 23)]; }
    }
  ]; }},
  helpMessages: { get: function () { return element.all(by.css('#manageQueueForm .help-block')); }},
  expandReleaseTimesButton: { get: function () { return element(by.css('#manageReleaseTimes .btn-expand')); }},
  collapseReleaseTimesButton: { get: function () { return element(by.css('#manageReleaseTimes .btn-collapse')); }},
  releaseTimeSummaries: { get: function () { return element.all(by.css('#manageQueueForm .release-time')); }},
  releaseTimes: { get: function () { return element.all(by.css('#release-time-list .item')); }},
  getReleaseTime: { value: function(index) { return element(by.css('#release-time-list .item:nth-child(' + (index + 1) + ')')); }},
  newReleaseTimeButton: { get: function () { return element(by.css('#manageReleaseTimes .btn-add')); }},
  addReleaseTimeButton: { get: function () { return element(by.id('add-release-time-button')); }},
  saveReleaseTimeButton: { get: function () { return element(by.id('save-release-time-button')); }},
  deleteReleaseTimeButtonSelector: { get: function () { return by.id('delete-release-time-link'); }},
  deleteReleaseTimeButton: { get: function () { return element(this.deleteReleaseTimeButtonSelector); }},
  deleteReleaseTimeButtonCount: { get: function () { return element.all(this.deleteReleaseTimeButtonSelector).count(); }},
  confirmDeleteReleaseTimeButton: { get: function () { return element(by.id('delete-item-unverified-button')); }},
  cancelReleaseTimeButton: { get: function () { return element(by.id('cancel-release-time-button')); }},
  saveButton: { get: function () { return element(by.id('save-queue-button')); }},
  cancelButton: { get: function () { return element(by.id('cancel-button')); }},
  deleteButtonSelector: { get: function () { return by.id('delete-queue-link'); }},
  deleteButton: { get: function () { return element(this.deleteButtonSelector); }},
  deleteButtonCount: { get: function () { return element.all(this.deleteButtonSelector).count(); }}
});

module.exports = QueueEditPage;
