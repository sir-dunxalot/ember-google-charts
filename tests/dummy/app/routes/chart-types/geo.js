/* BEGIN-SNIPPET geo-chart-route */

import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return [
      ['Country', 'Popularity'],
      ['South Africa', 600],
      ['Canada', 500],
      ['France', 600],
      ['Russia', 700],
      ['Australia', 600],
    ];
  },

});

/* END-SNIPPET */
