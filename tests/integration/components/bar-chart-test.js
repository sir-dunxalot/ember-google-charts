import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';

moduleForComponent('bar-chart', 'Integration | Component | bar chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  this.set('data', [
    ['Element', 'Density', { role: 'style' }],
    ['Copper', 8.94, '#b87333'],
    ['Silver', 10.49, 'silver'],
    ['Gold', 19.30, 'gold'],
    ['Platinum', 21.45, 'color: #e5e4e2'],
  ]);

  testChartRendering(assert, {
    context: this,
    template: hbs`{{bar-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'bar',
    usingMaterialCharts: true,
  });

});
