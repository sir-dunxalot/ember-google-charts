import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

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

export default Router;
