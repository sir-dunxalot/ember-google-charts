import Ember from 'ember';

const {
  Controller,
  run,
} = Ember;

export default Controller.extend({

  init() {
    run.later(() => {
      this.set('model', [
        ['Element', 'Density'],
        ['Copper', 4.94],
        ['Silver', 12.49],
        ['Gold', 12.30],
        ['Platinum', 25.45],
      ]);
    }, 4000);
  },

});
