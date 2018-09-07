import RSVP from 'rsvp';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({

  model() {
    return new RSVP.Promise((resolve) => {
      run.later(() => {
        resolve([
          ['Element', 'Density'],
          ['Copper', 8.94],
          ['Silver', 10.49],
          ['Gold', 19.30],
          ['Platinum', 21.45],
        ]);
      }, 100);
    });
  },

});
