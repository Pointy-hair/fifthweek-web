describe('view-subscribers-controller', function(){
  'use strict';

  var $q;
  var $scope;
  var target;

  var initializer;
  var blogRepositoryFactory;
  var blogRepository;
  var accountSettingsRepositoryFactory;
  var accountSettingsRepository;
  var blogStub;
  var errorFacade;

  beforeEach(function() {
    initializer = jasmine.createSpyObj('initializer', ['initialize']);
    blogRepositoryFactory = jasmine.createSpyObj('blogRepositoryFactory', ['forCurrentUser']);
    blogRepository = jasmine.createSpyObj('blogRepository', ['getBlogMap', 'getUserId']);
    blogRepositoryFactory.forCurrentUser.and.returnValue(blogRepository);
    accountSettingsRepositoryFactory = jasmine.createSpyObj('accountSettingsRepositoryFactory', ['forCurrentUser']);
    accountSettingsRepository = jasmine.createSpyObj('accountSettingsRepository', ['getAccountSettings']);
    accountSettingsRepositoryFactory.forCurrentUser.and.returnValue(accountSettingsRepository);
    blogStub = jasmine.createSpyObj('blogStub', ['getSubscriberInformation']);
    errorFacade = jasmine.createSpyObj('errorFacade', ['handleError']);

    module('webApp');
    module(function($provide) {
      $provide.value('initializer', initializer);
      $provide.value('blogRepositoryFactory', blogRepositoryFactory);
      $provide.value('accountSettingsRepositoryFactory', accountSettingsRepositoryFactory);
      $provide.value('blogStub', blogStub);
      $provide.value('errorFacade', errorFacade);
    });

    inject(function ($injector) {
      $q = $injector.get('$q');
      $scope = $injector.get('$rootScope').$new();
    });

    errorFacade.handleError.and.callFake(function(error, setMessage) {
      setMessage('friendlyError');
      return $q.when();
    });
  });

  var createController = function(){
    blogRepository.getUserId.and.returnValue('userId');
    inject(function ($controller) {
      target = $controller('viewSubscribersCtrl', { $scope: $scope });
    });
  };

  describe('when creating', function(){
    beforeEach(function(){
      createController();
    });

    it('should create the model', function(){
      expect($scope.model).toBeDefined();
    });

    it('should set isLoading to false', function(){
      expect($scope.model.isLoading).toBe(false);
    });

    it('should not have an error message', function(){
      expect($scope.model.errorMessage).toBeUndefined();
    });

    it('should set subscribers to an empty list', function(){
      expect($scope.model.subscribers).toEqual([]);
    });

    it('should set totalRevenue to undefined', function(){
      expect($scope.model.totalRevenue).toBeUndefined();
    });

    it('should get a blog repository', function(){
      expect(blogRepositoryFactory.forCurrentUser).toHaveBeenCalledWith();
    });

    it('should get an account settings repository', function(){
      expect(accountSettingsRepositoryFactory.forCurrentUser).toHaveBeenCalledWith();
    });

    it('should set the userId', function(){
      expect($scope.model.userId).toBe('userId');
    });

    it('should call initialize', function(){
      expect(initializer.initialize).toHaveBeenCalledWith(target.internal.initialize);
    });
  });

  describe('when created', function(){
    beforeEach(function(){
      createController();
    });

    describe('when processSubscribers is called', function(){
      describe('when no subscribers', function(){
        beforeEach(function(){
          $scope.model.estimatedWeeklyRevenue = undefined;
          $scope.model.totalSubscriptions = undefined;
          $scope.model.unacceptablePrices = undefined;

          $scope.model.subscribers = [];

          target.internal.accountSettings = { creatorPercentage: 0.9 };
          target.internal.processSubscribers();
        });

        it('should set estimatedWeeklyRevenue to zero', function(){
          expect($scope.model.estimatedWeeklyRevenue).toBe(0);
        });

        it('should set totalSubscriptions to zero', function(){
          expect($scope.model.totalSubscriptions).toBe(0);
        });

        it('should set unacceptablePrices to zero', function(){
          expect($scope.model.unacceptablePrices).toBe(0);
        });
      });

      describe('when subscribers exist', function(){
        beforeEach(function(){
          $scope.model.estimatedWeeklyRevenue = undefined;
          $scope.model.totalSubscriptions = undefined;
          $scope.model.unacceptablePrices = undefined;

          target.internal.accountSettings = { creatorPercentage: 0.9 };

          target.internal.blog = {
            channels: {
              id1: {
                price: 10,
                name: 'name1'
              },
              id2: {
                price: 20,
                name: 'name2'
              }
            }
          };

          $scope.model.subscribers =
            [
              {
                freeAccessEmail: 'one@test.com',
                hasPaymentInformation: true,
                paymentStatus: 'none',
                channels: [
                  {
                    channelId: 'id1',
                    acceptedPrice: 0
                  },
                  {
                    channelId: 'id2',
                    acceptedPrice: 0
                  }
                ]
              },
              {
                hasPaymentInformation: true,
                paymentStatus: 'none',
                channels: [
                  {
                    channelId: 'id1',
                    acceptedPrice: 10
                  }
                ]
              },
              {
                hasPaymentInformation: true,
                paymentStatus: 'failed',
                channels: [
                  {
                    channelId: 'id1',
                    acceptedPrice: 10
                  }
                ]
              },
              {
                hasPaymentInformation: true,
                paymentStatus: 'failed',
                channels: [
                  {
                    channelId: 'id1',
                    acceptedPrice: 5
                  }
                ]
              },
              {
                hasPaymentInformation: false,
                paymentStatus: 'none',
                channels: [
                  {
                    channelId: 'id1',
                    acceptedPrice: 10
                  },
                  {
                    channelId: 'id2',
                    acceptedPrice: 50
                  }
                ]
              },
              {
                hasPaymentInformation: true,
                paymentStatus: 'retry1',
                channels: [
                  {
                    channelId: 'id1',
                    acceptedPrice: 1
                  },
                  {
                    channelId: 'id2',
                    acceptedPrice: 50
                  }
                ]
              }
            ];

          target.internal.processSubscribers();
        });

        it('should set estimatedWeeklyRevenue', function(){
          expect($scope.model.estimatedWeeklyRevenue).toBe(30 * 0.9);
        });

        it('should set totalSubscriptions', function(){
          expect($scope.model.totalSubscriptions).toBe(4);
        });

        it('should set unacceptablePrices', function(){
          expect($scope.model.unacceptablePrices).toBe(1);
        });

        it('should set estimatedFailedPayments', function(){
          expect($scope.model.estimatedFailedPayments).toBe(3);
        });

        it('should set billableSubscribers', function(){
          expect($scope.model.billableSubscribers).toBe(3);
        });

        it('should update isBillable status', function(){
          expect($scope.model.subscribers[0].isBillable).toBe(true);
          expect($scope.model.subscribers[1].isBillable).toBe(true);
          expect($scope.model.subscribers[2].isBillable).toBe(false);
          expect($scope.model.subscribers[3].isBillable).toBe(false);
          expect($scope.model.subscribers[4].isBillable).toBe(false);
          expect($scope.model.subscribers[5].isBillable).toBe(true);
        });

        it('should update shouldDisplay status', function(){
          expect($scope.model.subscribers[0].isBillable).toBe(true);
          expect($scope.model.subscribers[1].isBillable).toBe(true);
          expect($scope.model.subscribers[2].isBillable).toBe(false);
          expect($scope.model.subscribers[3].isBillable).toBe(false);
          expect($scope.model.subscribers[4].isBillable).toBe(false);
          expect($scope.model.subscribers[5].isBillable).toBe(true);
        });
      });
    });

    describe('when loadForm is called', function(){
      var success;
      var error;
      var deferredGetBlogMap;
      var deferredGetAccountSettings;
      var deferredGetSubscriberInformation;
      beforeEach(function(){
        success = undefined;
        error = undefined;

        deferredGetAccountSettings = $q.defer();
        accountSettingsRepository.getAccountSettings.and.returnValue(deferredGetAccountSettings.promise);

        deferredGetBlogMap = $q.defer();
        blogRepository.getBlogMap.and.returnValue(deferredGetBlogMap.promise);

        deferredGetSubscriberInformation = $q.defer();
        blogStub.getSubscriberInformation.and.returnValue(deferredGetSubscriberInformation.promise);

        spyOn(target.internal, 'processSubscribers');
        $scope.model.isLoading = undefined;

        target.internal.loadForm().then(function(){ success = true; }, function(e){ error = e; });
        $scope.$apply();
      });

      it('should set isLoading to true', function(){
        expect($scope.model.isLoading).toBe(true);
      });

      it('should call getAccountSettings', function(){
        expect(accountSettingsRepository.getAccountSettings).toHaveBeenCalledWith();
      });

      describe('when getAccountSettings succeeds', function() {
        beforeEach(function(){
          deferredGetAccountSettings.resolve({ userId: 'userId' });
          $scope.$apply();
        });

        it('should set account settings', function(){
          expect(target.internal.accountSettings).toEqual({ userId: 'userId' });
        });

        it('should call getBlogMap', function(){
          expect(blogRepository.getBlogMap).toHaveBeenCalledWith();
        });

        describe('when getBlogMap succeeds', function(){
          beforeEach(function(){
            deferredGetBlogMap.resolve({ blogId: 'blogId' });
            $scope.$apply();
          });

          it('should set blog', function(){
            expect(target.internal.blog).toEqual({ blogId: 'blogId' });
          });

          it('should call getSubscriberInformation', function(){
            expect(blogStub.getSubscriberInformation).toHaveBeenCalledWith('blogId');
          });

          describe('when getSubscriberInformation succeeds', function(){
            beforeEach(function(){
              deferredGetSubscriberInformation.resolve({ data:
              {
                subscribers: 'subscribers',
                unreleasedRevenue: 'unreleasedRevenue',
                releasedRevenue: 'releasedRevenue',
                releasableRevenue: 'releasableRevenue'
              }});
              $scope.$apply();
            });

            it('should set the subscribers', function(){
              expect($scope.model.subscribers).toBe('subscribers');
            });

            it('should set the unreleasedRevenue', function(){
              expect($scope.model.unreleasedRevenue).toBe('unreleasedRevenue');
            });

            it('should set the releasedRevenue', function(){
              expect($scope.model.releasedRevenue).toBe('releasedRevenue');
            });

            it('should set the releasableRevenue', function(){
              expect($scope.model.releasableRevenue).toBe('releasableRevenue');
            });

            it('should call processSubscribers', function(){
              expect(target.internal.processSubscribers).toHaveBeenCalledWith();
            });

            it('should complete successfully', function(){
              expect(success).toBe(true);
            });
          });

          describe('when getSubscriberInformation fails', function(){
            beforeEach(function(){
              deferredGetSubscriberInformation.reject('error');
              $scope.$apply();
            });

            it('should not propagate the error', function(){
              expect(error).toBeUndefined();
            });

            it('should set the error message', function(){
              expect($scope.model.errorMessage).toBe('friendlyError');
            });

            it('should set isLoading to false', function(){
              expect($scope.model.isLoading).toBe(false);
            });
          });
        });

        describe('when getBlogMap fails', function(){
          beforeEach(function(){
            deferredGetBlogMap.reject('error');
            $scope.$apply();
          });

          it('should not propagate the error', function(){
            expect(error).toBeUndefined();
          });

          it('should set the error message', function(){
            expect($scope.model.errorMessage).toBe('friendlyError');
          });

          it('should set isLoading to false', function(){
            expect($scope.model.isLoading).toBe(false);
          });
        });
      });

      describe('when getAccountSettings fails', function(){
        beforeEach(function(){
          deferredGetAccountSettings.reject('error');
          $scope.$apply();
        });

        it('should not propagate the error', function(){
          expect(error).toBeUndefined();
        });

        it('should set the error message', function(){
          expect($scope.model.errorMessage).toBe('friendlyError');
        });

        it('should set isLoading to false', function(){
          expect($scope.model.isLoading).toBe(false);
        });
      });
    });

    describe('when calling initialize', function(){
      var success;
      var error;
      var deferredLoadForm;
      beforeEach(function(){
        success = undefined;
        error = undefined;

        deferredLoadForm = $q.defer();
        spyOn(target.internal, 'loadForm').and.returnValue(deferredLoadForm.promise);

        target.internal.initialize().then(function(){ success = true; }, function(e){ error = e; });
        $scope.$apply();
      });

      it('should call loadForm', function(){
        expect(target.internal.loadForm).toHaveBeenCalledWith();
      });

      describe('when loadForm succeeds', function(){
        beforeEach(function(){
          deferredLoadForm.resolve();
          $scope.$apply();
        });

        it('should complete successfully', function(){
          expect(success).toBe(true);
        });
      });

      describe('when loadForm fails', function(){
        beforeEach(function(){
          deferredLoadForm.reject('error');
          $scope.$apply();
        });

        it('should propagate the error', function(){
          expect(error).toBe('error');
        });
      });
    });
  });
});
