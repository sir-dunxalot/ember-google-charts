/* BEGIN-SNIPPET line-chart-route */

import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return [
      ['Year', 'Sales', 'Expenses'],
      ['2004', 1000, 400],
      ['2005', 1170, 460],
      ['2006', 660, 1120],
      ['2007', 1030, 540],
    ];
  },

});

/* END-SNIPPET */
