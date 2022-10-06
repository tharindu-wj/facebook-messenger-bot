/**
 * This module contain helper functions
 */

"use strict";

// normalize string by lowercase and removing white spaces from beginning and end
exports.normalizeString = (str = "") => str.toLowerCase().trim();

// generate random integer with given range
exports.generateRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
