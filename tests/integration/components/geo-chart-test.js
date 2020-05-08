import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Component | geo chart', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Country', 'Popularity'],
    ['South America', 600],
    ['Canada', 500],
    ['France', 600],
    ['Russia', 700],
    ['Australia', 600],
  ];

  test('Rendering the chart', async function(assert) {
    assert.expect(6);

    this.set('data', data);

    const chart = await renderChart(hbs`<GeoChart @data={{this.data}} />`);

    assertChart(assert, chart, {
      data,
      design: 'classic',
      type: 'geo',
    });
  });

});
