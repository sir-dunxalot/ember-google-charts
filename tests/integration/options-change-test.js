import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { renderChart } from 'ember-google-charts/test-support';

const data = [
  ['Year', 'Sales', 'Expenses'],
  ['2004', 1000, 400],
  ['2005', 1170, 460],
  ['2006', 660, 1120],
  ['2007', 1030, 540],
];

module('Integration | Component | chart options change', function(hooks) {
  setupRenderingTest(hooks);

  test('Changing options and rerender', async function(assert) {
    assert.expect(2);

    const title = 'Some legit title';

    this.setProperties({
      data,
      options: { title },
    });

    const chart = await renderChart(hbs`{{line-chart data=data options=options}}`);

    assert.ok(chart.textContent.indexOf(title) > -1,
      'The component should have a title');

    const newTitle = 'A new title';

    this.set('options', {
      title: newTitle,
    });

    await settled();

    assert.ok(chart.textContent.indexOf(newTitle) > -1,
      'The component should have the new title');

  });
});
