import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run: { later } } = Ember;

const data = [
  ['Date', 'Sales', 'Expenses'],
  [new Date(2000, 3, 1), 1000, 400],
  [new Date(2000, 3, 2), 1170, 460],
  [new Date(2000, 3, 3), 660, 1120],
  [new Date(2000, 3, 4), 1030, 540],
];

moduleForComponent('line-chart', 'Integration | Component | chart language', {
  integration: true,
});

test('Setting language', function(assert) {
  assert.expect(1);

  const done = assert.async();

  this.setProperties({
    data,
    options: {
      hAxis: { format: 'MMMM' },
    },
  });

  this.on('chartDidRender', () => {

    later(() => {
      assert.ok(this.$('div').html().indexOf('avril') > -1, 'The axis should be in french');
      done();
    }, 500);

  });

  this.render(hbs`{{line-chart data=data language='fr' options=options chartDidRender='chartDidRender'}}`);

});
