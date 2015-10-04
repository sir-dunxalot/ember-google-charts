import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';

moduleForComponent('pie-chart', 'Integration | Component | pie chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  this.set('data', [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ]);

  testChartRendering(assert, {
    context: this,
    template: hbs`{{pie-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'pie',
    usingMaterialCharts: false,
  });

});
