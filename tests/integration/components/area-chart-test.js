import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/test-chart-rendering';
import testChartOptions from '../../helpers/test-chart-options';

const data = [
  ['Year', 'Sales', 'Expenses'],
  ['2004', 1000, 400],
  ['2005', 1170, 460],
  ['2006', 660, 1120],
  ['2007', 1030, 540],
];

module('Integration | Component | area chart', function(hooks) {
  setupRenderingTest(hooks);

  test('Rendering the chart', function(assert) {

    testChartRendering(assert, {
      context: this,
      data,
      template: hbs`{{area-chart data=data chartDidRender=(action 'chartDidRender')}}`,
      type: 'area',
      usingMaterialCharts: false,
    });

  });

  test('Setting options', async function(assert) {

    await testChartOptions(assert, {
      context: this,
      data,
      template: hbs`{{area-chart data=data options=options}}`,
    });

  });
});
