'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _thumbnail_helpers = require('./thumbnail_helpers.js');

var _thumbnail_helpers2 = _interopRequireDefault(_thumbnail_helpers);

var _global = require('global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default options for the plugin.
var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = _video2.default.registerPlugin || _video2.default.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

var prepareThumbnailsClips = function prepareThumbnailsClips(videoTime, options) {

  var currentTime = 0;
  var currentIteration = 0;
  var thumbnailOffset = 0;
  var stepTime = options.stepTime;
  var thumbnailWidth = options.width;
  var spriteURL = options.spriteUrl;
  var thumbnailClips = {
    0: {
      src: spriteURL,
      style: {
        left: thumbnailWidth / 2 * -1 + 'px',
        width: (Math.floor(videoTime / stepTime) + 1) * thumbnailWidth + 'px',
        clip: 'rect(0,' + options.width + 'px,' + options.width + 'px, 0)'
      }
    }
  };

  while (currentTime <= videoTime) {
    currentTime += stepTime;
    thumbnailOffset = ++currentIteration * thumbnailWidth;
    thumbnailClips[currentTime] = {
      style: {
        left: (thumbnailWidth / 2 + thumbnailOffset) * -1 + 'px',
        clip: 'rect(0, ' + (thumbnailWidth + thumbnailOffset) + 'px,' + options.width + 'px, ' + thumbnailOffset + 'px)'
      }
    };
  }
  return thumbnailClips;
};

var initializeThumbnails = function initializeThumbnails(thumbnailsClips, player) {

  var thumbnailClips = _thumbnail_helpers2.default.createThumbnails({}, defaults, thumbnailsClips);
  var progressControl = player.controlBar.progressControl;
  var thumbnailImg = _thumbnail_helpers2.default.createThumbnailImg(thumbnailClips);
  var timelineTime = _thumbnail_helpers2.default.createThumbnailTime();
  var thumbnailArrowDown = _thumbnail_helpers2.default.createThumbnailArrowDown();
  var thumbnaislHolder = _thumbnail_helpers2.default.createThumbnaislHolder();

  thumbnaislHolder = _thumbnail_helpers2.default.mergeThumbnailElements(thumbnaislHolder, thumbnailImg, timelineTime, thumbnailArrowDown);
  _thumbnail_helpers2.default.hidePlayerOnHoverTime(progressControl);

  if (_global.window.navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    _thumbnail_helpers2.default.suportAndroidEvents();
  }

  _thumbnail_helpers2.default.createThumbnails(thumbnailImg.style, thumbnailClips['0'].style);

  _thumbnail_helpers2.default.centerThumbnailOverCursor(thumbnailImg);

  _thumbnail_helpers2.default.addThumbnailToPlayer(progressControl, thumbnaislHolder);

  _thumbnail_helpers2.default.upadateOnHover(progressControl, thumbnaislHolder, thumbnailClips, timelineTime, thumbnailImg, player);

  _thumbnail_helpers2.default.upadateOnHoverOut(progressControl, thumbnaislHolder, player);
};

var onPlayerReady = function onPlayerReady(player, options) {
  player.on('loadedmetadata', function () {
    var thumbnailsClips = prepareThumbnailsClips(player.duration(), options);

    initializeThumbnails(thumbnailsClips, player);
  });
};
/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function thumbnails
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var thumbnails = function thumbnails(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _video2.default.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('thumbnails', thumbnails);

// Include the version number.
thumbnails.VERSION = '__VERSION__';

exports.default = thumbnails;