import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
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

  test('Changing default options', async function(assert) {
    assert.expect(10);

    /* Change the defaultOptions property on the service */

    const options = {
      title: 'Sales and expenses',
    };

    const service = this.owner.lookup('service:google-charts');

    service.set('defaultOptions', options);

    /* See if the chart renders with the new default options */

    this.setProperties({
      data,
    });

    const chart = await renderChart(hbs`<LineChart @data={{this.data}} />`);

    assertChart(assert, chart, {
      data,
      design: 'material',
      options, // Checks that the default options are used
      type: 'line',
    });
  });

  test('Overriding default options', async function(assert) {
    assert.expect(10);

    const options = {
      title: 'Sales and expenses',
    };

    this.setProperties({
      data,
      options,
    });

    const chart = await renderChart(hbs`<LineChart @data={{this.data}} @defaultOptions={{this.options}} />`);

    assertChart(assert, chart, {
      data,
      design: 'material',
      options, // Checks that the default options are used
      type: 'line',
    });
  });
});
