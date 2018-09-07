import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Pass in Google DataTable', function(hooks) {
  setupRenderingTest(hooks);

  const dataArray = [
    ['Year', 'Sales', 'Expenses'],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
  ];

  const newDataArray = [
    ['Year', 'Sales', 'Expenses'],
    ['2008', 1000, 400],
    ['2009', 1170, 460],
  ];

  test('Passing in data to a Material Chart', async function(assert) {

    assert.expect(2);

    /* Render a chart with data passed as a JS Array */

    this.set('data', dataArray);

    await render(hbs`{{bar-chart data=data options=options}}`);

    await waitFor('.google-chart svg');

    await new Promise((resolve) => {
      later(resolve, 1000);
    });

    const $component = this.$('.google-chart');

    assert.ok($component.text().indexOf('2004') > -1,
      'The chart should be rendered with the data from the array');

    /* Render a chart with data passed as a Google DataTable */

    const dataTable = window.google.visualization.arrayToDataTable(newDataArray, false);

    this.set('data', dataTable);

    await settled();

    await new Promise((resolve) => {
      later(resolve, 1000);
    });

    assert.ok($component.text().indexOf('2008') > -1,
      'The chart should be rendered with the data from the DataTable');

  });

    test('Passing in data to a Classic Chart', async function(assert) {

    assert.expect(2);

    /* Render a chart with data passed as a JS Array */

    this.set('data', dataArray);

    await render(hbs`{{pie-chart data=data options=options}}`);

    await waitFor('.google-chart svg');

    await new Promise((resolve) => {
      later(resolve, 1000);
    });

    const $component = this.$('.google-chart');

    assert.ok($component.text().indexOf('2004') > -1,
      'The chart should be rendered with the data from the array');

    /* Render a chart with data passed as a Google DataTable */

    const dataTable = window.google.visualization.arrayToDataTable(newDataArray, false);

    this.set('data', dataTable);

    await settled();

    await new Promise((resolve) => {
      later(resolve, 1000);
    });

    assert.ok($component.text().indexOf('2008') > -1,
      'The chart should be rendered with the data from the DataTable');

  });

});
