import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [
      ['Age', 'Weight'],
      [8, 12],
      [4, 5.5],
      [11, 14],
      [4, 5],
      [3, 3.5],
      [6.5, 7],
    ];
  },

});
