angular.module('webApp')
  .factory('navigationMap', function(authenticationService, states) {
    'use strict';

    return [
      {
        name: 'Register',
        state: states.home.name,
        icon: 'fa fa-ticket',
        color: 'pink'
      },
      {
        name: 'Sign In',
        state: states.signIn.name,
        icon: 'fa fa-sign-in',
        color: 'green'
      },
      {
        name: function() { return authenticationService.currentUser.username; },
        id: 'Username',
        state: states.account.name,
        icon: 'fa fa-user',
        color: 'pink',
        secondary:
        [
          {
            name: 'Account',
            state: states.account.name,
            icon: 'fa fa-child',
            color: 'pink'
          },
          {
            name: 'Sign Out',
            state: states.signOut.name,
            icon: 'fa fa-sign-out',
            color: 'pink'
          }
        ]
      },
      {
        separator: true
      },
      {
        name: 'Create Your Subscription',
        state: states.creators.createSubscription.name,
        icon: 'fa fa-asterisk',
        color: 'yellow'
      },
      {
        name: 'New Post',
        state: states.creators.compose.note.name,
        icon: 'fa fa-pencil-square-o',
        color: 'yellow',
        secondary:
        [
          {
            name: 'Note',
            state: states.creators.compose.note.name,
            icon: 'fa fa-quote-left',
            color: 'yellow'
          },
          {
            name: 'Image',
            state: states.creators.compose.image.name,
            icon: 'fa fa-image',
            color: 'yellow'
          },
          {
            name: 'File',
            state: states.creators.compose.file.name,
            icon: 'fa fa-file-o',
            color: 'yellow'
          }
        ]
      },
      {
        name: 'Customize',
        state: states.creators.customize.landingPage.name,
        icon: 'fa fa-eye',
        color: 'green',
        secondary:
        [
          {
            name: 'Landing Page',
            state: states.creators.customize.landingPage.name,
            icon: 'fa fa-arrow-circle-down',
            color: 'green'
          },
          {
            name: 'Channels',
            state: states.creators.customize.channels.name,
            icon: 'fa fa-list-alt',
            color: 'green'
          },
          {
            name: 'Collections',
            state: states.creators.customize.collections.name,
            icon: 'fa fa-th',
            color: 'green'
          }
        ]
      },
      { separator: true },
      {
        name: 'Help',
        state: states.help.faq.name,
        icon: 'fa fa-question-circle',
        color: 'blue',
        secondary:
        [
          {
            name: 'FAQ',
            state: states.help.faq.name,
            icon: 'fa fa-book',
            color: 'blue'
          },
          {
            name: 'Contact Us',
            state: states.help.contact.name,
            icon: 'fa fa-comment-o',
            color: 'blue'
          }
        ]
      }
    ];
  });
