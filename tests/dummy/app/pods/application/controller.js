import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({

  actions: {
    linkTo(url) {
      window.open(url);
    },
  },

});
