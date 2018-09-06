import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/test-chart-rendering';
import testChartOptions from '../../helpers/test-chart-options';

const data = [
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#b87333'],
  ['Silver', 10.49, 'silver'],
  ['Gold', 19.30, 'gold'],
  ['Platinum', 21.45, 'color: #e5e4e2'],
];

module('Integration | Component | scatter chart', function(hooks) {
  setupRenderingTest(hooks);

  test('Rendering the chart', function(assert) {

    testChartRendering(assert, {
      context: this,
      data,
      template: hbs`{{scatter-chart data=data chartDidRender=(action 'chartDidRender')}}`,
      type: 'scatter',
      usingMaterialCharts: true,
    });

  });

  test('Setting options', function(assert) {

    testChartOptions(assert, {
      context: this,
      data,
      template: hbs`{{scatter-chart data=data options=options chartDidRender=(action 'chartDidRender')}}`,
    });

  });
});
