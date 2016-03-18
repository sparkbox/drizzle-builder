import parseOptions from './options';
import prepare from './prepare';
import parse from './parse';
import write from './write';

/**
 * Build the drizzle!
 *
 * @return {Promise}; ...
 */
function drizzle (options) {
  const opts = parseOptions(options);
  return prepare(opts).then(parse).then(write);
}

export default drizzle;
