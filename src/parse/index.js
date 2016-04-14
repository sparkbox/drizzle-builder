/**
 * @module parse
 */
import parseData from './data';
import parsePages from './pages';
import parsePatterns from './patterns';
import parseTemplates from './templates';

import DrizzleError from '../utils/error';
/**
 * Parse files with data from src and build a drizzleData object
 * @param {Object} options
 * @return {Promise} resolving to Drizzle data object
 */
function parseAll (options) {
  return Promise.all([
    parseData(options),
    parsePages(options),
    parsePatterns(options),
    parseTemplates(options)
  ]).then(
    allData => {
      return {
        data      : allData[0],
        pages     : allData[1],
        patterns  : allData[2],
        templates : allData[3],
        options   : options
      };
    },
    error => DrizzleError.error(error, options.debug)
  );
}

export default parseAll;
