import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('area-chart', 'Integration | Component | area chart', {
  integration: true,
});

test('it renders', function(assert) {
  const done = assert.async();

  assert.expect(7);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('data', [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ]);

  this.on('chartDidRender', (chart) => {
    const visualization = window.google.visualization;
    const $component = this.$('div:first-child');

    assert.ok(!!visualization,
      'The visualization library should have loaded');

    assert.ok(!!visualization.AreaChart,
      'The AreaChart visualization constructor should be available');

    assert.ok($component.find('svg').length,
      'The component should have an SVG rendered inside it');

    assert.ok($component.hasClass('area-chart'),
      'The component should have the area-chart class');

    assert.ok($component.hasClass('google-chart'),
      'The component should have the google-chart class');

    assert.ok(visualization.AreaChart === chart.constructor,
      'The component should have a public chart property');

    done();
  });

  this.render(hbs`{{area-chart data=data chartDidRender='chartDidRender'}}`);

  assert.equal(this.$().text().trim(), '',
    'The component should render');

});
