import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Component | chart options change', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ];

  test('Changing options and rerender', async function(assert) {
    assert.expect(20);

    const options = {
      title: 'Some legit title',
    };

    this.setProperties({
      data,
      options,
    });

    const chart = await renderChart(hbs`{{line-chart data=data options=options}}`);

    assertChart(assert, chart, {
      data,
      design: 'material',
      options,
      type: 'line',
    });

    const newOptions = {
      title: 'A different title',
    };

    this.set('options', newOptions);

    await settled();

    assertChart(assert, chart, {
      data,
      design: 'material',
      options: newOptions,
      type: 'line',
    });

  });
});
