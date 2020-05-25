import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { triggerEvent } from '@ember/test-helpers';
import { assertChart, renderChart } from 'ember-google-charts/test-support';

module('Integration | Viewport resize', function(hooks) {
  setupRenderingTest(hooks);

  const data = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ];

  const options = {
    title: 'Sales and expenses',
  };

  test('Resizing the chart container', async function(assert) {
    assert.expect(11);

    this.setProperties({
      data,
      options,
    });

    const chart = await renderChart(hbs`
      <div style="width: 500px">
        <LineChart @data={{this.data}} @options={{this.options}} />
      </div>
    `);

    assertChart(assert, chart, {
      data,
      design: 'material',
      options,
      type: 'line',
    });

    chart.parentElement.style.width = '400px';

    await triggerEvent(window, 'resize');

    const svgStyle = getComputedStyle(chart.querySelector('svg'));

    assert.equal(svgStyle.width, '400px',
      'The SVG element should have the same width as the chart container');
  });

  test('Resizing disabled', async function(assert) {
    assert.expect(11);

    this.setProperties({
      data,
      options,
    });

    const chart = await renderChart(hbs`
      <div style="width: 500px">
        <LineChart @data={{this.data}} @options={{this.options}} @responsiveResize={{false}} />
      </div>
    `);

    assertChart(assert, chart, {
      data,
      design: 'material',
      options,
      type: 'line',
    });

    chart.parentElement.style.width = '400px';

    await triggerEvent(window, 'resize');

    const svgStyle = getComputedStyle(chart.querySelector('svg'));

    assert.equal(svgStyle.width, '500px',
      'The SVG element should have the initial width');
  });
});
