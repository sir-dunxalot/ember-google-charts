import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/test-chart-rendering';
import testChartOptions from '../../helpers/test-chart-options';

const data = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
];

module('Integration | Component | pie chart', function(hooks) {
  setupRenderingTest(hooks);

  test('Rendering the chart', function(assert) {

    testChartRendering(assert, {
      context: this,
      data,
      template: hbs`{{pie-chart data=data chartDidRender=(action 'chartDidRender')}}`,
      type: 'pie',
      usingMaterialCharts: false,
    });

  });

  test('Setting options', function(assert) {

    testChartOptions(assert, {
      context: this,
      data,
      template: hbs`{{pie-chart data=data options=options chartDidRender=(action 'chartDidRender')}}`,
    });

  });
});
