import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    linkTo(url) {
      window.open(url);
    },
  },

});
