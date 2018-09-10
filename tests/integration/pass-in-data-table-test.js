import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Pass in Google DataTable', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
  ];

  test('Passing data as a JS Array', async function(assert) {

    assert.expect(18);

    this.set('data', data);

    /* Render a material chart */

    const materialChart = await renderChart(hbs`{{bar-chart data=data}}`);

    assertChart(assert, materialChart, {
      data,
      design: 'material',
      type: 'bar',
    });

    /* Render a classic chart */

    const classicChart = await renderChart(hbs`{{area-chart data=data}}`);

    assertChart(assert, classicChart, {
      data,
      design: 'classic',
      type: 'area',
    });

  });

  test('Passing data as a DataTable', async function(assert) {

    assert.expect(18);

    const service = this.owner.lookup('service:google-charts');

    await service.loadPackages();

    const dataTable = window.google.visualization.arrayToDataTable(data, false);

    /* Render a chart with data passed as a JS Array */

    this.set('data', dataTable);

    /* Render a material chart */

    const materialChart = await renderChart(hbs`{{bar-chart data=data}}`);

    assertChart(assert, materialChart, {
      data,
      design: 'material',
      type: 'bar',
    });

    /* Render a classic chart */

    const classicChart = await renderChart(hbs`{{area-chart data=data}}`);

    assertChart(assert, classicChart, {
      data,
      design: 'classic',
      type: 'area',
    });

  });

});
