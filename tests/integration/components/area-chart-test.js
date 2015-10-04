import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('area-chart', 'Integration | Component | area chart', {
  integration: true,
});

test('it renders', function(assert) {
  let chartRendered = false;
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('data', [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ]);

  this.render(hbs`{{area-chart data=data}}`);

  // Ember.Test.registerWaiter(function() {
  //   return !!chartRendered;
  // });

  assert.equal(this.$().text().trim(), '',
    'The component should render');

});
