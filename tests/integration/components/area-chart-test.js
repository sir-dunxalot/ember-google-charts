import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';

moduleForComponent('area-chart', 'Integration | Component | area chart', {
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
    template: hbs`{{area-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'area',
    usingMaterialCharts: false,
  });

});
