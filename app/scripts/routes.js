'use strict';

angular.module('webApp')
  .constant('states', {
    home: {
      name: 'home'
    },
    pricing: {
      name: 'pricing'
    },
    gettingStarted: {
      name: 'gettingStarted'
    },
    contact: {
      name: 'contact'
    },
    legal: {
      name: 'legal',
      termsOfService: {
        name: 'legal.termsOfService'
      },
      privacyPolicy: {
        name: 'legal.privacyPolicy'
      }
    },
    register: {
      name: 'register'
    },
    landingPage: {
      name: 'landingPage'
    },
    signIn: {
      name: 'signIn',
      signIn: {
        name: 'signIn.signIn'
      },
      forgot: {
        name: 'signIn.forgot'
      },
      reset: {
        name: 'signIn.reset'
      }
    },
    user: {
      name: 'user',
      signOut: {
        name: 'user.signOut'
      },
      account: {
        name: 'user.account'
      },
      creatorAccount: {
        name: 'user.creatorAccount'
      },
      newsFeed: {
        name: 'user.newsFeed'
      },
      notifications: {
        name: 'user.notifications'
      },
      paymentInformation: {
        name: 'user.paymentInformation'
      },
      viewSubscriptions: {
        name: 'user.viewSubscriptions'
      },
      feedback: {
        name: 'user.feedback'
      }
    },
    creator: {
      name: 'creator',
      createBlog: {
        name: 'creator.createBlog'
      },
      landingPage: {
        name: 'creator.landingPage',
        preview: {
          name: 'creator.landingPage.preview'
        },
        edit: {
          name: 'creator.landingPage.edit'
        }
      },
      posts: {
        name: 'creator.posts',
        compose: {
          name: 'creator.posts.compose'
        },
        live: {
          name: 'creator.posts.live'
        },
        scheduled: {
          name: 'creator.posts.scheduled',
          list: {
            name: 'creator.posts.scheduled.list'
          },
          queues: {
            name: 'creator.posts.scheduled.queues',
            list: {
              name: 'creator.posts.scheduled.queues.list'
            },
            reorder: {
              name: 'creator.posts.scheduled.queues.reorder'
            }
          }
        }
      },
      queues: {
        name: 'creator.queues',
        new: {
          name: 'creator.queues.new'
        },
        edit: {
          name: 'creator.queues.edit'
        },
        list: {
          name: 'creator.queues.list'
        }
      },
      channels: {
        name: 'creator.channels',
        new: {
          name: 'creator.channels.new'
        },
        edit: {
          name: 'creator.channels.edit'
        },
        list: {
          name: 'creator.channels.list'
        }
      },
      subscribers: {
        name: 'creator.subscribers',
        all: {
          name: 'creator.subscribers.all'
        },
        guestList: {
          name: 'creator.subscribers.guestList'
        }
      }
    },
    help: {
      name: 'help'
    },
    notAuthorized: {
      name: 'notAuthorized'
    },
    notFound: {
      name: 'notFound'
    },
    comingSoon: {
      name: 'comingSoon'
    },
    admin: {
      name: 'admin',
      transactions: {
        name: 'admin.transactions'
      },
      lookup: {
        name: 'admin.lookup'
      },
      creatorRevenues: {
        name: 'admin.creatorRevenues'
      }
    }
  })
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, states, authenticationServiceConstants, authorizationServiceConstants) {

    $locationProvider.html5Mode(true);

    //for any unmatched url, redirect to home page
    $urlRouterProvider.otherwise('/not-found');

    $stateProvider
      .state(states.home.name, {
        url: '/',
        templateUrl: 'modules/information/pages/home.html',
        data: {
          pageTitle: 'Home',
          headDescription: 'Fifthweek lets you effortlessly share anything with paying subscribers, so you can make a living doing what you love.',
          navigationHidden: false,
          bodyClass: 'info-page'
        }
      })
      .state(states.pricing.name, {
        url: '/pricing',
        templateUrl: 'modules/information/pages/pricing.html',
        data : {
          headTitle: ': ' + 'Pricing',
          navigationHidden: false,
          bodyClass: 'info-page'
        }
      })
      .state(states.legal.name, {
        url: '/legal',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.legal.termsOfService.name,
        data : {
        }
      })
      .state(states.legal.termsOfService.name, {
        url: '/terms',
        templateUrl: 'modules/information/pages/terms-and-conditions.html',
        data : {
          headTitle: ': ' + 'Terms and Conditions',
          navigationHidden: false,
          bodyClass: 'info-page'
        }
      })
      .state(states.legal.privacyPolicy.name, {
        url: '/privacy',
        templateUrl: 'modules/information/pages/privacy-policy.html',
        data : {
          headTitle: ': ' + 'Privacy Policy',
          navigationHidden: false,
          bodyClass: 'info-page'
        }
      })
      .state(states.gettingStarted.name, {
        url: '/go',
        templateUrl: 'modules/information/pages/getting-started.html',
        data : {
          headTitle: ': ' + 'Getting Started',
          navigationHidden: false,
          bodyClass: 'info-page'
        }
      })
      .state(states.help.name, {
        url: '/help',
        templateUrl: 'modules/information/pages/help.html',
        data : {
          headTitle: ': ' + 'Help',
          navigationHidden: 'header',
          bodyClass: 'info-page'
        }
      })
      .state(states.contact.name, {
        url: '/contact',
        templateUrl: 'modules/information/pages/contact.html',
        data : {
          headTitle: ': ' + 'Contact Us',
          navigationHidden: false,
          bodyClass: 'info-page'
        }
      })
      .state(states.register.name, {
        url: '/register',
        templateUrl: 'modules/registration/register.html',
        controller: 'RegisterCtrl',
        data : {
          pageTitle: 'Register',
          headTitle: ': ' + 'Register',
          access: {
            requireUnauthenticated: true
          }
        }
      })
      .state(states.signIn.name, {
        url: '/sign-in',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.signIn.signIn.name,
        data : {
          access: {
            requireUnauthenticated: true
          }
        }
      })
      .state(states.signIn.signIn.name, {
        url: '',
        templateUrl: 'views/sign-in/sign-in.html',
        controller: 'SignInCtrl',
        data : {
          pageTitle: 'Sign In',
          headTitle: ': ' + 'Sign In',
          access: {
            requireUnauthenticated: true
          }
        }
      })
      .state(states.signIn.forgot.name, {
        url: '/forgot',
        templateUrl: 'views/sign-in/forgot.html',
        controller: 'SignInForgotCtrl',
        data : {
          pageTitle: 'Forgot Your Details?',
          headTitle: ': ' + 'Forgot Details?',
          access: {
            requireUnauthenticated: true
          }
        }
      })
      .state(states.signIn.reset.name, {
        url: '/reset?userId&token',
        templateUrl: 'views/sign-in/reset.html',
        controller: 'SignInResetCtrl',
        data : {
          pageTitle: 'Reset Password',
          headTitle: ': ' + 'Reset Password',
          access: {
            requireUnauthenticated: true
          }
        }
      })
      .state(states.user.name, {
        url: '/user',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.user.newsFeed.name,
        data : {
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.paymentInformation.name, {
        url: '/payment-information',
        templateUrl: 'modules/payments/update-payment-information.html',
        controller: 'updatePaymentInformationCtrl',
        data : {
          bodyClass: 'page-update-payment-information',
          pageTitle: 'Update Payment Information',
          headTitle: ': ' + 'Update Payment Information',
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.viewSubscriptions.name, {
        url: '/view-subscriptions',
        templateUrl: 'modules/subscriptions/view-subscriptions.html',
        controller: 'viewSubscriptionsCtrl',
        data : {
          bodyClass: 'page-view-subscriptions',
          pageTitle: 'Your Subscriptions',
          headTitle: ': ' + 'Your Subscriptions',
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.account.name, {
        url: '/account',
        templateUrl: 'modules/account/account.html',
        controller: 'AccountCtrl',
        data : {
          pageTitle: 'Account Settings',
          headTitle: ': ' + 'Account Settings',
          bodyClass: 'page-account-settings',
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.feedback.name, {
        url: '',
        templateUrl: 'modules/common/ui-view.html',
        data : {
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.creatorAccount.name, {
        url: '/publish',
        templateUrl: 'modules/account/become-creator.html',
        controller: 'becomeCreatorCtrl',
        data : {
          pageTitle: 'Publish',
          headTitle: ': ' + 'Publish',
          bodyClass: 'page-become-creator',
          access: {
            requireAuthenticated: true,
            roles: [authenticationServiceConstants.roles.creator],
            roleCheckType: authorizationServiceConstants.roleCheckType.none
          }
        }
      })
      .state(states.user.signOut.name, {
        url: '/sign-out',
        templateUrl: 'views/signout.html',
        controller: 'SignOutCtrl',
        data : {
          pageTitle: 'Sign Out',
          headTitle: ': ' + 'Sign Out',
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.newsFeed.name, {
        url: '/latest-posts',
        templateUrl: 'modules/newsfeed/newsfeed.html',
        data : {
          pageTitle: 'Latest Posts',
          headTitle: ': ' + 'Latest Posts',
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.user.notifications.name, {
        url: '/notifications',
        templateUrl: 'modules/notifications/notifications.html',
        data : {
          pageTitle: 'Notifications',
          headTitle: ': ' + 'Notifications',
          bodyClass: 'page-notifications',
          access: {
            requireAuthenticated: true
          }
        }
      })
      .state(states.creator.name, {
        abstract: false,
        url: '/creator',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.creator.posts.name,
        data : {
          access: {
            requireAuthenticated: true,
            roles: [authenticationServiceConstants.roles.creator]
          }
        }
      })
      .state(states.creator.createBlog.name, {
        url: '/create-channel',
        templateUrl: 'modules/creator-blog/create-blog.html',
        controller: 'createBlogCtrl',
        requireBlog: false,
        data : {
          pageTitle: 'Create Channel',
          headTitle: ': ' + 'Create Channel'
        }
      })
      .state(states.creator.landingPage.name, {
        abstract: false,
        url: '/profile',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.creator.landingPage.edit.name,
        requireBlog: true,
        data : {
        }
      })
      .state(states.creator.landingPage.preview.name, {
        url: '/preview',
        controller: 'landingPageRedirectCtrl',
        requireBlog: true,
        data : {
        }
      })
      .state(states.creator.landingPage.edit.name, {
        url: '/edit',
        templateUrl: 'modules/creator-blog/customize-landing-page.html',
        controller: 'customizeLandingPageCtrl',
        requireBlog: true,
        data : {
          pageTitle: 'Edit Appearance',
          headTitle: ': ' + 'Edit Appearance',
          bodyClass: 'page-customize-landing'
        }
      })
      .state(states.creator.posts.name, {
        abstract: false,
        url: '/posts',
        templateUrl: 'modules/common/ui-view.html',
        requireBlog: true,
        redirectTo: states.creator.posts.live.name,
        data : {
        }
      })
      .state(states.creator.posts.compose.name, {
        url: '',
        templateUrl: 'modules/common/ui-view.html',
        requireBlog: true
      })
      .state(states.creator.posts.live.name, {
        url: '/live',
        templateUrl: 'modules/creator-posts/creator-posts.html',
        requireBlog: true,
        data : {
          pageTitle: 'Live Posts',
          headTitle: ': ' + 'Live Posts'
        }
      })
      .state(states.creator.posts.scheduled.name, {
        url: '/scheduled',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.creator.posts.scheduled.list.name,
        requireBlog: true,
        data : {
        }
      })
      .state(states.creator.posts.scheduled.list.name, {
        url: '',
        templateUrl: 'modules/creator-backlog/backlog-post-list.html',
        controller: 'backlogPostListCtrl',
        requireBlog: true,
        data : {
          pageTitle: 'Scheduled Posts',
          headTitle: ': ' + 'Scheduled Posts',
          bodyClass: 'page-creator-backlog-post-list'
        }
      })
      .state(states.creator.queues.name, {
        url: '/queues',
        templateUrl: 'modules/common/ui-view.html',
        requireBlog: true,
        redirectTo: states.creator.queues.list.name,
        data : {
          bodyClass: 'page-creator-queues'
        }
      })
      .state(states.creator.queues.new.name, {
        url: '/new',
        templateUrl: 'modules/queues/new-queue.html',
        controller: 'newQueueCtrl',
        requireBlog: true,
        data : {
          headTitle: ': ' + 'Create Queue'
        }
      })
      .state(states.creator.queues.edit.name, {
        url: '/{id}',
        templateUrl: 'modules/queues/edit-queue.html',
        controller: 'editQueueCtrl',
        requireBlog: true,
        data : {
          headTitle: ': ' + 'Edit Queue'
        }
      })
      .state(states.creator.queues.list.name, {
        url: '',
        templateUrl: 'modules/queues/list-queues.html',
        controller: 'listQueuesCtrl',
        requireBlog: true,
        data : {
          pageTitle: 'Queues',
          headTitle: ': ' + 'Queues'
        }
      })
      .state(states.creator.channels.name, {
        url: '/channels',
        templateUrl: 'modules/common/ui-view.html',
        requireBlog: true,
        redirectTo: states.creator.channels.list.name,
        data : {
          bodyClass: 'page-creator-channels'
        }
      })
      .state(states.creator.channels.new.name, {
        url: '/new',
        templateUrl: 'modules/channels/new-channel.html',
        controller: 'newChannelCtrl',
        requireBlog: true,
        data : {
          headTitle: ': ' + 'Create Channel'
        }
      })
      .state(states.creator.channels.edit.name, {
        url: '/{id}',
        templateUrl: 'modules/channels/edit-channel.html',
        controller: 'editChannelCtrl',
        requireBlog: true,
        data : {
          headTitle: ': ' + 'Edit Channel'
        }
      })
      .state(states.creator.channels.list.name, {
        url: '',
        templateUrl: 'modules/channels/list-channels.html',
        controller: 'listChannelsCtrl',
        requireBlog: true,
        data : {
          pageTitle: 'Blogs',
          headTitle: ': ' + 'Blogs'
        }
      })
      .state(states.creator.subscribers.name, {
        url: '/subscribers',
        templateUrl: 'modules/common/ui-view.html',
        requireBlog: true,
        redirectTo: states.creator.subscribers.all.name,
        data : {
        }
      })
      .state(states.creator.subscribers.all.name, {
        url: '/all',
        templateUrl: 'modules/subscribers/view-subscribers.html',
        controller: 'viewSubscribersCtrl',
        requireBlog: true,
        data : {
          bodyClass: 'page-view-subscribers',
          pageTitle: 'Subscribers',
          headTitle: ': ' + 'Subscribers'
        }
      })
      .state(states.creator.subscribers.guestList.name, {
        url: '/guest-list',
        templateUrl: 'modules/guest-list/guest-list.html',
        controller: 'guestListCtrl',
        requireBlog: true,
        data : {
          bodyClass: 'page-guest-list',
          pageTitle: 'Guest List',
          headTitle: ': ' + 'Guest List'
        }
      })
      .state(states.admin.name, {
        url: '/admin',
        templateUrl: 'modules/common/ui-view.html',
        redirectTo: states.admin.lookup.name,
        data : {
          access: {
            requireAuthenticated: true,
            roles: [authenticationServiceConstants.roles.administrator]
          }
        }
      })
      .state(states.admin.transactions.name, {
        url: '/transactions',
        templateUrl: 'modules/admin/transactions.html',
        controller: 'transactionsCtrl',
        data : {
          bodyClass: 'page-admin-transactions',
          pageTitle: 'Transactions',
          headTitle: ': ' + 'Transactions'
        }
      })
      .state(states.admin.lookup.name, {
        url: '/lookup',
        templateUrl: 'modules/admin/object-lookup.html',
        controller: 'objectLookupCtrl',
        data : {
          bodyClass: 'page-admin-lookup',
          pageTitle: 'Lookup',
          headTitle: ': ' + 'Lookup'
        }
      })
      .state(states.admin.creatorRevenues.name, {
        url: '/creator-revenues',
        templateUrl: 'modules/admin/creator-revenues.html',
        controller: 'creatorRevenuesCtrl',
        data : {
          bodyClass: 'page-creator-revenues',
          pageTitle: 'Creator Revenues',
          headTitle: ': ' + 'Creator Revenues'
        }
      })
      .state(states.notAuthorized.name, {
        url: '/not-authorized',
        templateUrl: 'views/not-authorized.html',
        data : {
          pageTitle: 'Not Authorized',
          headTitle: ': ' + 'Not Authorized'
        }
      })
      .state(states.notFound.name, {
        url: '/not-found',
        templateUrl: 'views/not-found.html',
        data : {
          pageTitle: 'Not Found',
          headTitle: ': ' + 'Not Found'
        }
      })
      .state(states.comingSoon.name, {
        url: '/coming-soon',
        templateUrl: 'views/coming-soon.html',
        data : {
          pageTitle: 'Coming Soon',
          headTitle: ': ' + 'Coming Soon'
        }
      })
      .state(states.landingPage.name, {
        url: '/{username:[a-zA-Z0-9_]{2,20}}/:action/:key',
        params: {
          action: {
            value: null,
            squash: true
          },
          key: {
            value: null,
            squash: true
          }
        },
        templateUrl: 'modules/landing-page/landing-page.html',
        controller: 'landingPageCtrl',
        data : {
          pageTitle: 'Landing Page',
          headTitle: ': ' + 'Landing Page',
          navigationHidden: 'header',
          bodyClass: 'page-landing-page',
          access: {
            requireAuthenticated: false
          }
        }
      })
    ;
});
