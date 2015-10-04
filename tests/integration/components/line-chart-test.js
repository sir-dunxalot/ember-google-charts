import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';

moduleForComponent('line-chart', 'Integration | Component | line chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  this.set('data', [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ]);

  testChartRendering(assert, {
    context: this,
    template: hbs`{{line-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'line',
    usingMaterialCharts: true,
  });

});
