/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-param-reassign */

const mountPointResolution = require('./mountpoint_resolution.js');

/**
* The 'pre' function that is executed before the HTML is rendered
 * @param payload The current payload of processing pipeline
 * @param payload.content The content
 */

function pre(payload) {
  /*
  if (action.logger) {
    action.logger.debug('payload.request');
    action.logger.debug(payload.request);

    action.logger.debug('action.request');
    action.logger.debug(action.request);
  } else {
    console.log('no logger found')
  } */

  payload.dispatch = {};

  // payload.dispatch.headers = action.headers;

  if (!payload.request.url) {
    payload.request.url = '/index.html';
  }

  if (payload.request.headers['x-strain'].match('-docs-')) {
    payload.dispatch.url = payload.request.path.replace(/\.md/, '.docs.html');
    const mountPoint = mountPointResolution(payload.request.headers['x-strain']);

    payload.dispatch.url = `/${mountPoint}${payload.dispatch.url}`;
  } else {
    payload.dispatch.url = payload.request.url.replace(/\.html/, '.default.html');
  }

  // if (payload.request.url.indexOf('/docs') !== -1) {
  //   console.log('docs', payload.request.url);
  //   payload.dispatch.url = payload.request.url.replace(/\.html/, '.docs.html');
  // }
}

module.exports.pre = pre;
