import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const data = [
  ['Year', 'Sales', 'Expenses'],
  ['2004', 1000, 400],
  ['2005', 1170, 460],
  ['2006', 660, 1120],
  ['2007', 1030, 540],
];

module('Integration | Component | chart options change', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('Changing options and rerender', async function(assert) {
    assert.expect(2);

    const done = assert.async();

    const title = 'Some legit title';

    this.setProperties({
      data,
      options: { title },
    });

    this.actions.chartDidRender = () => {

      later(() => {
        assert.ok(find('div').innerHTML.indexOf(title) > -1, 'The component should have a title');

        this.set('options', {});

        later(() => {
          assert.ok(find('div').innerHTML.indexOf(title) === -1, 'The component should no longer have a title');

          done();

        }, 100);

      }, 500);

      this.actions.chartDidRender = function() {};

    };

    await render(hbs`{{line-chart data=data options=options chartDidRender=(action 'chartDidRender')}}`);

  });
});
