import Controller from '@ember/controller';
import { run } from '@ember/runloop';

export default Controller.extend({

  init() {
    this._super(...arguments);
    run.later(() => {
      this.model = [
        ['Element', 'Density'],
        ['Copper', 4.94],
        ['Silver', 12.49],
        ['Gold', 12.30],
        ['Platinum', 25.45],
      ];
    }, 4000);
  },

});
