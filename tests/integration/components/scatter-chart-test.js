import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Component | scatter chart', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Element', 'Density', { role: 'style' }],
    ['Copper', 8.94, '#b87333'],
    ['Silver', 10.49, 'silver'],
    ['Gold', 19.30, 'gold'],
    ['Platinum', 21.45, 'color: #e5e4e2'],
  ];

  const options = {
    title: 'Element densities',
  };

  test('Rendering the chart', async function(assert) {
    assert.expect(10);

    this.set('data', data);
    this.set('options', options);

    const chart = await renderChart(hbs`<ScatterChart @data={{this.data}} @options={{this.options}} />`);

    assertChart(assert, chart, {
      data,
      design: 'material',
      options,
      type: 'scatter',
    });
  });
});
