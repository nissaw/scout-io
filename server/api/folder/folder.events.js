/**
 * Folder model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Folder = require('../../sqldb').Folder;
var FolderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FolderEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Folder.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FolderEvents.emit(event + ':' + doc._id, doc);
    FolderEvents.emit(event, doc);
    done(null);
  }
}

module.exports = FolderEvents;
