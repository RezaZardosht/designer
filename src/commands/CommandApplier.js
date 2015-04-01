/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

define('polymer-designer/commands/CommandApplier', function() {

  /**
   * Applies commands to documents, including embedded and linked
   * stylesheets.
   *
   * @abstract
   */
  function CommandApplier(doc, nodes) {
    this.doc = doc;
    this.nodes = nodes;
  }

  CommandApplier.prototype = {

    apply: function(command) {
      var handler = this.handlers[command.commandType];
      if (handler == null) {
        throw new Error('Unknown command type: ' + command.commandType);
      }
      if (handler.canApply(this.doc, this.nodes, command)) {
        handler.apply(this.doc, this.nodes, command);
      } else {
        console.error("Can't apply command ", command);
      }
    },

    undo: function(command) {
      var handler = this.handlers[command.commandType];
      if (handler.canUndo(this.doc, command)) {
        handler.undo(this.doc, command);
      } else {
        console.error("Can't undo command ", command);
      }
    },

  };

  // exports
  return CommandApplier;

});
