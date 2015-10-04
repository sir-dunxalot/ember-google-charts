import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';

moduleForComponent('geo-chart', 'Integration | Component | geo chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  this.set('data', [
    ['Country', 'Popularity'],
    ['South America', 600],
    ['Canada', 500],
    ['France', 600],
    ['Russia', 700],
    ['Australia', 600],
  ]);

  testChartRendering(assert, {
    context: this,
    template: hbs`{{geo-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'geo',
    usingMaterialCharts: false,
  });

});
