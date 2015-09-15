describe('queue service', function(){
  'use strict';

  var queueId = 'queueId';
  var queueName = 'queue name';
  var blogId = 'blogId';
  var weeklyReleaseTime = 42;
  var weeklyReleaseTimes = [weeklyReleaseTime];

  var $q;
  var $rootScope;
  var blogRepositoryFactory;
  var blogRepository;
  var queueStub;
  var initializer;
  var target;

  beforeEach(function() {
    module('webApp');

    blogRepository = jasmine.createSpyObj('blogRepository', ['getBlog', 'createQueue', 'updateQueue', 'deleteQueue']);
    blogRepositoryFactory = { forCurrentUser: function() { return blogRepository; }};
    queueStub = jasmine.createSpyObj('queueStub', ['postQueue', 'putQueue', 'deleteQueue']);
    initializer = jasmine.createSpyObj('initializer', ['initialize']);

    module(function($provide) {
      $provide.value('blogRepositoryFactory', blogRepositoryFactory);
      $provide.value('queueStub', queueStub);
      $provide.value('initializer', initializer);
    });

    inject(function($injector) {
      $q = $injector.get('$q');
      $rootScope = $injector.get('$rootScope');
      target = $injector.get('queueService');
    });

    queueStub.postQueue.and.returnValue($q.when({ data: { queueId: queueId, defaultWeeklyReleaseTime: weeklyReleaseTime } }));
    queueStub.putQueue.and.returnValue($q.when());
    queueStub.deleteQueue.and.returnValue($q.when());
    blogRepository.createQueue.and.returnValue($q.when());
    blogRepository.updateQueue.and.returnValue($q.when());
    blogRepository.deleteQueue.and.returnValue($q.when());
    blogRepository.getBlog.and.returnValue($q.when({ blogId: blogId }));
  });

  it('should call initialize when created', function(){
    expect(initializer.initialize).toHaveBeenCalledWith(target.internal.initialize);
  });

  describe('when initializing', function(){
    it('should get the blog repository', function(){
      expect(target.internal.blogRepository).toBeUndefined();
      target.internal.initialize();
      expect(target.internal.blogRepository).toBe(blogRepository);
    });
  });

  describe('when initialized', function(){
    beforeEach(function(){
      target.internal.initialize();
    });

    describe('when creating a queue from name', function(){
      it('should create the queue via the API', function() {
        target.createQueueFromName(queueName);
        $rootScope.$apply();

        expect(queueStub.postQueue).toHaveBeenCalledWith({blogId: blogId, name: queueName});
      });

      it('should create the queue via the blog repository', function() {
        target.createQueueFromName(queueName);
        $rootScope.$apply();

        expect(blogRepository.createQueue).toHaveBeenCalledWith({
          queueId: queueId,
          name: queueName,
          weeklyReleaseSchedule: [weeklyReleaseTime]
        });
      });

      it('should return the new queue ID', function() {
        var actualResult = null;
        target.createQueueFromName(queueName).then(function(result) {
          actualResult = result;
        });
        $rootScope.$apply();

        expect(actualResult).toBe(queueId);
      });
    });

    describe('when updating a queue', function() {
      var queueData;
      beforeEach(function() {
        queueData = {
          name: queueName,
          weeklyReleaseSchedule: weeklyReleaseTimes
        };
      });

      it('should update the queue via the API', function() {
        target.updateQueue(queueId, queueData);
        $rootScope.$apply();

        expect(queueStub.putQueue).toHaveBeenCalledWith(queueId, queueData);
      });

      it('should update the queue via the client-side repository', function() {
        target.updateQueue(queueId, queueData);
        $rootScope.$apply();

        expect(blogRepository.updateQueue).toHaveBeenCalledWith({
          queueId: queueId,
          name: queueName,
          weeklyReleaseSchedule: weeklyReleaseTimes
        });
      });
    });

    describe('when deleting a queue', function() {
      it('should delete the queue via the API', function() {
        target.deleteQueue(queueId);
        $rootScope.$apply();

        expect(queueStub.deleteQueue).toHaveBeenCalledWith(queueId);
      });

      it('should delete the queue from the client-side repository', function() {
        target.deleteQueue(queueId);
        $rootScope.$apply();

        expect(blogRepository.deleteQueue).toHaveBeenCalledWith(queueId);
      });
    });
  });
});
