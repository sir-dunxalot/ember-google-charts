// BEGIN-SNIPPET sankey-diagram-route
import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [
      [ 'From', 'To' , 'Weight' ],
      [ 'A', 'X', 5 ],
      [ 'A', 'Y', 7 ],
      [ 'A', 'Z', 6 ],
      [ 'B', 'X', 2 ],
      [ 'B', 'Y', 9 ],
      [ 'B', 'Z', 4 ],
    ];
  },

});
// END-SNIPPET
