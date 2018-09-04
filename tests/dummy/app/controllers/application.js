import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    linkTo(url) {
      window.open(url);
    },

    transitionTo(routeName) {
      this.transitionToRoute(routeName);
    },
  },

});
