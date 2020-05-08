import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Component | area chart', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ];

  const options = {
    title: 'Sales expenses',
  };

  test('Rendering the chart', async function(assert) {
    assert.expect(10);

    this.set('data', data);
    this.set('options', options);

    const chart = await renderChart(hbs`<AreaChart @data={{this.data}} @options={{this.options}} />`);

    assertChart(assert, chart, {
      data,
      design: 'classic',
      options,
      type: 'area',
    });
  });
});
