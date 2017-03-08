import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const RouterInstance = Router.extend({
  location: config.locationType,
});

RouterInstance.map(function() {

  this.route('chart-types', function() {
    this.route('area');
    this.route('bar');
    this.route('geo');
    this.route('line');
    this.route('pie');
    this.route('scatter');
  });

  this.route('promises');

});

export default RouterInstance;
