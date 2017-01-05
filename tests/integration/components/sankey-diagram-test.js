import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';
import testChartOptions from '../../helpers/sync/test-chart-options';

const data = [
  [ 'From', 'To' , 'Weight' ],
  [ 'A', 'X', 5 ],
  [ 'A', 'Y', 7 ],
  [ 'A', 'Z', 6 ],
  [ 'B', 'X', 2 ],
  [ 'B', 'Y', 9 ],
  [ 'B', 'Z', 4 ],
];

moduleForComponent('sankey-diagram', 'Integration | Component | sankey diagram', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  testChartRendering(assert, {
    context: this,
    data,
    template: hbs`{{sankey-diagram data=data chartDidRender='chartDidRender'}}`,
    type: 'sankey',
    usingMaterialCharts: false,
  });

});

test('Setting options', function(assert) {

  testChartOptions(assert, {
    context: this,
    data,
    options: {},
    template: hbs`{{sankey-diagram data=data options=options chartDidRender='chartDidRender'}}`,
  });

});
