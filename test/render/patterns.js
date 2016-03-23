/* global describe, it, before */
var chai = require('chai');
var config = require('../config');
var expect = chai.expect;
var prepare = require('../../dist/prepare/');
var parse = require('../../dist/parse/');
var renderPatterns = require('../../dist/render/patterns');

describe ('render/patterns', () => {
  var opts, allData;
  before (() => {
    opts = config.parseOptions(config.fixtureOpts);
    allData =  prepare(opts).then(parse).then(renderPatterns);
    return allData;
  });
  it ('should have data', () => {
    allData.then(drizzleData => {
    //  config.logObj(drizzleData.patterns);
    });
  });
  // it ('should compile templates', () => {
  //   return allData.then(drizzleData => {
  //     expect(drizzleData.pages['04-sandbox'].contents)
  //       .to.have.string('<h1>Sandbox</h1>');
  //   });
  // });
  // it ('should override layouts when told to', () => {
  //   return allData.then(drizzleData => {
  //     const customPage = drizzleData.pages.doThis;
  //     expect(customPage.contents).to.contain('This is the Page Layout');
  //     expect(customPage.contents).to.contain('<h2>foobar</h2>');
  //   });
  // });
});
