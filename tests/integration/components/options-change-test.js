import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run: { later } } = Ember;

const data = [
  ['Year', 'Sales', 'Expenses'],
  ['2004', 1000, 400],
  ['2005', 1170, 460],
  ['2006', 660, 1120],
  ['2007', 1030, 540],
];

moduleForComponent('line-chart', 'Integration | Component | chart options change', {
  integration: true,
});

test('Changing options and rerender', function(assert) {
  assert.expect(2);

  const done = assert.async();

  const title = 'Some legit title';

  this.setProperties({
    data,
    options: { title },
  });

  this.render(hbs`{{line-chart data=data options=options chartDidRender='chartDidRender'}}`);

  this.on('chartDidRender', () => {

    later(() => {
      assert.ok(this.$('div').html().indexOf(title) > -1, 'The component should have a title');

      this.set('options', {});

      later(() => {
        assert.ok(this.$('div').html().indexOf(title) === -1, 'The component should no longer have a title');

        done();

      }, 100);

    }, 500);

  });

});
