/* BEGIN-SNIPPET geo-chart-route */

import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model() {
    return [
      ['Country', 'Popularity'],
      ['South America', 600],
      ['Canada', 500],
      ['France', 600],
      ['Russia', 700],
      ['Australia', 600],
    ];
  },

});

/* END-SNIPPET */
