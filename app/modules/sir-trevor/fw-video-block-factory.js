angular.module('webApp').factory('fwVideoBlockFactory',
  function() {
    'use strict';

    var service = {};

    var urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    service.createBlock = function(){

      return SirTrevor.Block.extend({

        // more providers at https://gist.github.com/jeffling/a9629ae28e076785a14f
        providers: {
          vimeo: {
            regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo\.co(?:.+(?:\/)([^\/].*)+$)/,
            html: '<iframe src=\"<%= protocol %>//player.vimeo.com/video/<%= remote_id %>?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>'
          },
          youtube: {
            regex: /^.*(?:(?:youtu\.be\/)|(?:youtube\.com)\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)/,
            html: '<iframe src=\"<%= protocol %>//www.youtube.com/embed/<%= remote_id %>\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>'
          }
        },

        type: 'video',
        title: function() { return i18n.t('blocks:video:title'); },

        pastable: true,

        icon_name: 'video',

        onBlockRender: function() {
          this.$inputs.find('input').attr('placeholder', 'Paste URL here');
        },

        loadData: function(data){

          if (!this.providers.hasOwnProperty(data.source)) { return; }

          var source = this.providers[data.source];

          var protocol = window.location.protocol === 'file:' ?
            'http:' : window.location.protocol;

          var aspectRatioClass = source.square ?
            'with-square-media' : 'with-sixteen-by-nine-media';

          var compiledTemplate = _.template(source.html);
          this.$editor
            .addClass('st-block__editor--' + aspectRatioClass)
            .html(compiledTemplate({
              protocol: protocol,
              remote_id: data.remote_id,
              width: this.$editor.width() // for videos like vine
            }));
        },

        onContentPasted: function(event){
          this.handleDropPaste(event.target.value);
        },

        matchVideoProvider: function(provider, index, url) {
          var match = provider.regex.exec(url);
          if(!match || _.isUndefined(match[1])) { return {}; }

          return {
            source: index,
            remote_id: match[1]
          };
        },

        handleDropPaste: function(url){
          if (!this.isURI(url)) { return; }

          for(var key in this.providers) {
            if (!this.providers.hasOwnProperty(key)) { continue; }
            this.setAndLoadData(
              this.matchVideoProvider(this.providers[key], key, url)
            );
          }
        },

        isURI : function(string) {
          return (urlRegex.test(string));
        }
      });
    };

    return service;
  });
