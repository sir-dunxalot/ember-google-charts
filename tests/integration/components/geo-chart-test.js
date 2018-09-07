import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/test-chart-rendering';
import testChartOptions from '../../helpers/test-chart-options';

const data = [
  ['Country', 'Popularity'],
  ['South America', 600],
  ['Canada', 500],
  ['France', 600],
  ['Russia', 700],
  ['Australia', 600],
];

module('Integration | Component | geo chart', function(hooks) {
  setupRenderingTest(hooks);

  test('Rendering the chart', function(assert) {

    testChartRendering(assert, {
      context: this,
      data,
      template: hbs`{{geo-chart data=data chartDidRender=(action 'chartDidRender')}}`,
      type: 'geo',
      usingMaterialCharts: false,
    });

  });

  test('Setting options', async function(assert) {

    await testChartOptions(assert, {
      context: this,
      data,
      options: {
        title: null,
      },
      template: hbs`{{geo-chart data=data options=options}}`,
    });

  });
});
