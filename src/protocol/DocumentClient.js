/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

define('polymer-designer/protocol/DocumentClient', function() {
  'use strict';

  class DocumentClient {

    /**
     * @param {ClientConnection} connection
     * @param {Map} nodes
     */
    constructor(connection, nodes) {
      console.assert(connection != null);
      this.connection = connection;
      this.nodes = nodes || new Map();
    }

    /**
     * @returns {Promise}
     */
    sendCommand(command) {
      return this.connection.request({
        messageType: 'command',
        command: command,
      });
    }

    /**
     * @returns {Promise}
     */
    selectElementAtPoint(clientX, clientY, bounds) {
      return this.connection.request({
        messageType: 'selectElementAtPoint',
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      });
    }

    /**
     * @returns {Promise}
     */
    selectElement(nodeId) {
      return this.connection.request({
        messageType: 'selectElement',
        nodeId: nodeId,
      });
    }

    /**
     * @returns {Promise}
     */
     selectionBoundsChanged(bounds, cursor) {
      return this.connection.request({
        messageType: 'selectionBoundsChanged',
        bounds: bounds,
        cursor: cursor,
      });
    }

    getCaretPosition(clientX, clientY, bounds) {
      return this.connection.request({
        messageType: 'getCaretPosition',
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      });
    }

    moveCursor(move) {
      return this.connection.request({
        messageType: 'moveCursor',
        move: move,
      });
    }

    insertText(text) {
      return this.connection.request({
        messageType: 'insertText',
        text: text,
      });
    }

  }

  return DocumentClient;

});
