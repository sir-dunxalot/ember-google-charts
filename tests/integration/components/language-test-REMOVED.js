import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const data = [
  ['Date', 'Sales', 'Expenses'],
  [new Date(2000, 3, 1), 1000, 400],
  [new Date(2000, 3, 2), 1170, 460],
  [new Date(2000, 3, 3), 660, 1120],
  [new Date(2000, 3, 4), 1030, 540],
];

module('Integration | Component | chart language', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('Setting language', async function(assert) {
    assert.expect(1);

    const done = assert.async();

    this.setProperties({
      data,
      options: {
        hAxis: { format: 'MMMM' },
      },
    });

    this.actions.chartDidRender = () => {

      later(() => {
        assert.ok(find('div').innerHTML.indexOf('avril') > -1, 'The axis should be in french');
        done();
      }, 500);

    };

    await render(hbs`{{line-chart data=data language='fr' options=options chartDidRender='chartDidRender'}}`);

  });
});
