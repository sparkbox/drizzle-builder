/**
 * Prepare/partials module.
 * @module prepare/partials
 */
import { resourceId } from '../utils/object';
import { readFiles } from '../utils/parse';
import DrizzleError from '../utils/error';

/**
 * Register the files matching `src.glob` as partials. Keys are generated by
 * using path relative to `src.basedir` separated by `.`
 * @param {Object} src    Object with `path` and `basedir` props
 *                        @see defaults
 * @param {Object} options
 * @param {String} prefix Gets passed to `resourceId` as the
 *                        `resourceCollection` argument. @see utils/object
 * @return {Promise}
 */
function registerPartials (src, options, prefix = '') {
  return readFiles(src.glob, options).then(partialFiles => {
    partialFiles.forEach(partialFile => {
      const partialKey = resourceId(partialFile, src.basedir, prefix);
      options.handlebars.registerPartial(partialKey, partialFile.contents);
    });
  });
}

/**
 * Register a glob of partials.
 * @param {Object} Handlebars instance
 * @param {String} or {Array} glob
 */
function preparePartials (options) {
  return Promise.all([
    registerPartials(options.src.partials, options), // Partials as partials
    registerPartials(options.src.patterns, options, 'patterns'), // Patterns
    registerPartials(options.src.layouts, options) // Layouts as partials
  ]).then(
    () => options,
    error => new DrizzleError(error).handle(options.debug));
}

export default preparePartials;
