import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testChartRendering from '../../helpers/sync/test-chart-rendering';
import testChartOptions from '../../helpers/sync/test-chart-options';

const data = [
  ['Name', 'Start', 'End'],
  [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
  [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
  [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ],
];

moduleForComponent('timeline-chart', 'Integration | Component | timeline chart', {
  integration: true,
});

test('Rendering the chart', function(assert) {

  testChartRendering(assert, {
    context: this,
    data,
    template: hbs`{{timeline-chart data=data chartDidRender='chartDidRender'}}`,
    type: 'timeline',
    usingMaterialCharts: false,
  });

});

test('Setting options', function(assert) {

  testChartOptions(assert, {
    context: this,
    data,
    options: {},
    template: hbs`{{timeline-chart data=data options=options chartDidRender='chartDidRender'}}`,
  });

});
