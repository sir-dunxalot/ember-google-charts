import Ember from 'ember';

export default Ember.Route.extend({

  actions: {

    linkTo(url) {
      window.open(url);
    },

    transitionTo(routeName) {
      const routeNameParts = routeName.split('.');
      const pageTitleIndex = routeNameParts.length - 1;
      const name = Ember.String.capitalize(routeNameParts[pageTitleIndex]);

      this.transitionTo(routeName);
      this.controller.set('pageTitle', `${name} Charts`);
    },
  },

});
