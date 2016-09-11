import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {

  this.route('chart-types', function() {
    this.route('area');
    this.route('bar');
    this.route('geo');
    this.route('line');
    this.route('pie');
    this.route('scatter');
    this.route('sankey');
  });

  this.route('promises');

});

export default Router;
