describe('fw-blob-image directive', function(){
  'use strict';

  var blobImageCtrlConstants;

  var $rootScope;
  var $compile;

  var controllerInitialize;

  beforeEach(function() {
    module('webApp', 'webApp.views');

    controllerInitialize  = jasmine.createSpyObj('controllerInitialize', ['init']);
    module(function($controllerProvider){
      $controllerProvider.register('blobImageCtrl', function($scope) { controllerInitialize.init($scope); });
    });

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      blobImageCtrlConstants = $injector.get('blobImageCtrlConstants');
    });
  });

  describe('when creating', function(){

    var scope;

    beforeEach(function(){
      scope = $rootScope.$new();
    });

    it('should not initialize the control with an update function on the scope if it does not exist', function(){
      var element = angular.element('<fw-blob-image />');
      $compile(element)(scope);
      scope.$digest();

      expect(element.isolateScope().control).not.toBeDefined();
    });

    it('should assign a control value on the scope from attribute if control attribute exists', function(){
      scope.something = {
        a: 'a',
        initialize: function(){}
      };

      var element = angular.element('<fw-blob-image control="something" />');
      $compile(element)(scope);
      scope.$digest();

      expect(element.isolateScope().control).toBeDefined();
      expect(element.isolateScope().control.a).toBeDefined();
    });

    describe('when a control variable exists', function(){
      beforeEach(function(){
        scope.control = {};

        scope.control.initialize = function(handler){
          scope.control.update = handler;
        };

        spyOn(scope.control, 'initialize').and.callThrough();
      });

      it('should initialize the control variable', function(){
        var element = angular.element('<fw-blob-image control="control" />');
        $compile(element)(scope);
        scope.$digest();

        expect(scope.control.initialize).toHaveBeenCalled();
      });

      it('should broadcast an event when update is called', function(){
        var element = angular.element('<fw-blob-image control="control" />');
        $compile(element)(scope);
        scope.$digest();

        var isolateScope = element.isolateScope();
        spyOn(isolateScope, '$broadcast');

        scope.control.update('containerName', 'fileId', true);

        expect(isolateScope.$broadcast).toHaveBeenCalledWith(blobImageCtrlConstants.updateEvent, 'containerName', 'fileId', undefined, true, undefined);
      });

      it('should broadcast an event when update is called without the availableImmediately parameter', function(){
        var element = angular.element('<fw-blob-image control="control" />');
        $compile(element)(scope);
        scope.$digest();

        var isolateScope = element.isolateScope();
        spyOn(isolateScope, '$broadcast');

        scope.control.update('containerName', 'fileId');

        expect(isolateScope.$broadcast).toHaveBeenCalledWith(blobImageCtrlConstants.updateEvent, 'containerName', 'fileId', undefined, undefined, undefined);
      });

      it('should broadcast an event when update is called without any parameters', function(){
        var element = angular.element('<fw-blob-image control="control" />');
        $compile(element)(scope);
        scope.$digest();

        var isolateScope = element.isolateScope();
        spyOn(isolateScope, '$broadcast');

        scope.control.update();

        expect(isolateScope.$broadcast).toHaveBeenCalledWith(blobImageCtrlConstants.updateEvent);
      });

      it('should broadcast an event with the thumbnail url when update is called and thumbnail is specified', function(){
        var element = angular.element('<fw-blob-image control="control" thumbnail="thumb" />');
        $compile(element)(scope);
        scope.$digest();

        var isolateScope = element.isolateScope();
        spyOn(isolateScope, '$broadcast');

        scope.control.update('containerName', 'fileId', true, 'callback');

        expect(isolateScope.$broadcast).toHaveBeenCalledWith(blobImageCtrlConstants.updateEvent, 'containerName', 'fileId', 'thumb', true, 'callback');
      });
    });

    describe('when specifying the fileId inline', function(){

      var broadcastFileId;
      var broadcastContainerName;
      var broadcastThumbnail;
      var broadcastAvailableImmediately;

      beforeEach(function(){
        broadcastFileId = undefined;
        broadcastContainerName = undefined;
        broadcastThumbnail = undefined;
        broadcastAvailableImmediately = undefined;

        controllerInitialize.init.and.callFake(function(s){
          s.$on(blobImageCtrlConstants.updateEvent, function(event, containerName, fileId, thumbnail, availableImmediately){
            broadcastFileId = fileId;
            broadcastContainerName = containerName;
            broadcastThumbnail = thumbnail;
            broadcastAvailableImmediately = availableImmediately;
          });
        });
      });

      it('should call update immediately if the fileId and containerName are specified as attributes', function(){
        var element = angular.element('<fw-blob-image file-id="fileId" container-name="containerName" />');
        $compile(element)(scope);
        scope.$digest();

        expect(broadcastFileId).toBe('fileId');
        expect(broadcastContainerName).toBe('containerName');
        expect(broadcastThumbnail).toBeUndefined();
        expect(broadcastAvailableImmediately).toBe(true);
      });

      it('should call update immediately with thumbnail if the fileId and containerName are specified as attributes', function(){
        var element = angular.element('<fw-blob-image file-id="fileId" container-name="containerName" thumbnail="blah" />');
        $compile(element)(scope);
        scope.$digest();

        expect(broadcastFileId).toBe('fileId');
        expect(broadcastContainerName).toBe('containerName');
        expect(broadcastThumbnail).toBe('blah');
        expect(broadcastAvailableImmediately).toBe(true);
      });

      it('should not call update immediately if only the containerName is specified as an attribute', function(){
        var element = angular.element('<fw-blob-image container-name="containerName" />');
        $compile(element)(scope);
        scope.$digest();
        scope.$apply();

        expect(broadcastFileId).toBeUndefined();
        expect(broadcastContainerName).toBeUndefined();
        expect(broadcastThumbnail).toBeUndefined();
        expect(broadcastAvailableImmediately).toBeUndefined();
      });

      it('should not call update immediately if only the fileId is specified as an attribute', function(){
        var element = angular.element('<fw-blob-image file-id="fileId" />');
        $compile(element)(scope);
        scope.$digest();
        scope.$apply();

        expect(broadcastFileId).toBeUndefined();
        expect(broadcastContainerName).toBeUndefined();
        expect(broadcastThumbnail).toBeUndefined();
        expect(broadcastAvailableImmediately).toBeUndefined();
      });

      it('should not call update immediately if neither fileId nor containerName is specified as an attribute', function(){
        var element = angular.element('<fw-blob-image />');
        $compile(element)(scope);
        scope.$digest();
        scope.$apply();

        expect(broadcastFileId).toBeUndefined();
        expect(broadcastContainerName).toBeUndefined();
        expect(broadcastThumbnail).toBeUndefined();
        expect(broadcastAvailableImmediately).toBeUndefined();
      });
    });
  });

  describe('when created', function(){

    var scope;
    var isolateScope;
    var element;

    beforeEach(function(){
      scope = $rootScope.$new();
      element = angular.element('<fw-blob-image />');
      $compile(element)(scope);
      scope.$digest();

      isolateScope = element.isolateScope();
      isolateScope.model = {};
    });

    describe('when first created', function(){

      beforeEach(function(){
      });

      it('should not display the thumbnail area', function(){
        expect(element.find('.thumbnail-area').length).toBe(0);
      });

      it('should not display the error area', function(){
        expect(element.find('.error-area').length).toBe(0);
      });

      it('should not display the updating area', function(){
        expect(element.find('.updating-area').length).toBe(0);
      });

      it('should display the blank area', function(){
        expect(element.find('.blank-area').length).toBe(1);
      });
    });

    describe('when updating', function(){

      beforeEach(function(){
        isolateScope.model.updating = true;
        isolateScope.$digest();
      });

      it('should not display the thumbnail area', function(){
        expect(element.find('.thumbnail-area').length).toBe(0);
      });

      it('should not display the error area', function(){
        expect(element.find('.error-area').length).toBe(0);
      });

      it('should display the updating area', function(){
        expect(element.find('.updating-area').length).toBe(1);
      });

      it('should not display the blank area', function(){
        expect(element.find('.blank-area').length).toBe(0);
      });
    });

    describe('when an error occurs', function(){

      beforeEach(function(){
        isolateScope.model.errorMessage = 'blah';
        isolateScope.$digest();
      });

      it('should not display the thumbnail area', function(){
        expect(element.find('.thumbnail-area').length).toBe(0);
      });

      it('should display the error area', function(){
        expect(element.find('.error-area').length).toBe(1);
      });

      it('should not display the updating area', function(){
        expect(element.find('.updating-area').length).toBe(0);
      });

      it('should not display the blank area', function(){
        expect(element.find('.blank-area').length).toBe(0);
      });

      /* It no longer displays the error message */
      /*
      it('should display the error message', function(){
        var result = element.find('.error-area p');
        expect(result.length).toBe(1);

        var p = result[0];
        expect(_.trim(p.textContent)).toBe('blah');
      });
      */
    });

    describe('when an imageUri exists', function(){

      beforeEach(function(){
        isolateScope.model.imageUri = 'debug.html';
        isolateScope.$digest();
      });

      it('should display the thumbnail area', function(){
        expect(element.find('.thumbnail-area').length).toBe(1);
      });

      it('should not display the error area', function(){
        expect(element.find('.error-area').length).toBe(0);
      });

      it('should not display the updating area', function(){
        expect(element.find('.updating-area').length).toBe(0);
      });

      it('should not display the blank area', function(){
        expect(element.find('.blank-area').length).toBe(0);
      });

      it('should set the image source to the fileId', function(){
        var result = element.find('.thumbnail-area img');
        expect(result.length).toBe(1);

        var img = result[0];
        expect(_.endsWith(img.src, isolateScope.model.imageUri)).toBeTruthy();
      });
    });
  });
});
