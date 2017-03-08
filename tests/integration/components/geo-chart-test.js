import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';
import testChartOptions from '../../helpers/sync/test-chart-options';

const data = [
  ['Country', 'Popularity'],
  ['South America', 600],
  ['Canada', 500],
  ['France', 600],
  ['Russia', 700],
  ['Australia', 600],
];

moduleForComponent('geo-chart', 'Integration | Component | geo chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  testChartRendering(assert, {
    context: this,
    data,
    template: hbs`{{geo-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'geo',
    usingMaterialCharts: false,
  });

});

test('Setting options', function(assert) {

  /* TODO: Test height reliably in-browser here */

  testChartOptions(assert, {
    context: this,
    data,
    options: {},
    template: hbs`{{geo-chart data=data options=options chartDidRender='chartDidRender'}}`,
  });

});
