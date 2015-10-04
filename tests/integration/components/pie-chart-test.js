import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';
import testChartOptions from '../../helpers/sync/test-chart-options';

const data = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
];

moduleForComponent('pie-chart', 'Integration | Component | pie chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  testChartRendering(assert, {
    context: this,
    data,
    template: hbs`{{pie-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'pie',
    usingMaterialCharts: false,
  });

});

test('Setting options', function(assert) {

  testChartOptions(assert, {
    context: this,
    data,
    template: hbs`{{pie-chart data=data options=options chartDidRender='chartDidRender'}}`,
  });

});
