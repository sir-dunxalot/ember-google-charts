import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';
import testChartOptions from '../../helpers/sync/test-chart-options';

const data = [
  ['Year', 'Sales', 'Expenses'],
  ['2004', 1000, 400],
  ['2005', 1170, 460],
  ['2006', 660, 1120],
  ['2007', 1030, 540],
];

moduleForComponent('area-chart', 'Integration | Component | area chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  testChartRendering(assert, {
    context: this,
    data,
    template: hbs`{{area-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'area',
    usingMaterialCharts: false,
  });

});

test('Setting options', function(assert) {

  testChartOptions(assert, {
    context: this,
    data,
    template: hbs`{{area-chart data=data options=options chartDidRender='chartDidRender'}}`,
  });

});
