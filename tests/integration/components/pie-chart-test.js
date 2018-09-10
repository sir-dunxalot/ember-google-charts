import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Component | pie chart', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  const options = {
    title: 'Sales expenses',
  };

  test('Rendering the chart', async function(assert) {
    assert.expect(9);

    this.set('data', data);
    this.set('options', options);

    const chart = await renderChart(hbs`{{pie-chart data=data options=options}}`);

    assertChart(assert, chart, {
      data,
      design: 'classic',
      options,
      type: 'pie',
    });
  });
});
