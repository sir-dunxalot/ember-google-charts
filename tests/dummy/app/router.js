import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {

  this.route('chart-types', function() {
    this.route('bar');
    this.route('line');
  });

});

export default Router;
