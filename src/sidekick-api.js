/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-console */

/**
 * Returns the browser's runtime API.
 * @private
 * @returns {Object} The runtime
 */
function getRuntime() {
  const c = window.chrome || window.browser;
  if (!c || !c.runtime) {
    throw new Error('no browser runtime found');
  }
  return c.runtime;
}

/**
 * Sends a message to the sidekick extension
 * @private
 * @param {string} action The action name
 * @param {Object} options The message options
 * @param {function} callback The callback function
 */
async function msg(action, options, callback) {
  getRuntime().sendMessage(
    window.SIDEKICK_ID || 'ccfggkjabjahcjoljmgmklhpaccedipo',
    {
      ...options,
      action,
    },
    callback,
  );
}

/**
 * The Sidekick API
 */
export default class SidekickAPI {
  /**
   * The configuration
   * @type {Object}
   * @private
   */
  #cfg;

  /**
   * Returns a new instance of {@code SidekickAPI}
   * @param {Object} cfg The configuration
   * @param {string} cfg.owner The GitHub owner
   * @param {string} cfg.repo The GitHub repository
   */
  constructor(cfg) {
    this.#cfg = cfg;
  }

  /**
   * Returns the sidekick's current status.
   * @returns {Object} The status
   */
  async getStatus() {
    try {
      return new Promise((resolve, reject) => {
        try {
          msg('getStatus', this.#cfg, (res) => resolve(res));
        } catch (e) {
          reject(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
    return null;
  }
}
