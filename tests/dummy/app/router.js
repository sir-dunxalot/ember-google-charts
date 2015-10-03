import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {

  this.route('chart-types', function() {
    this.route('bar');
    this.route('geo');
    this.route('line');
    this.route('pie');
    this.route('scatter');
  });

});

export default Router;
