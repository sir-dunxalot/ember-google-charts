import { capitalize } from '@ember/string';
import formatData from 'ember-google-charts/utils/format-data';

export default function assertChart(assert, chart, properties = {}) {
  const { data, design, options = {}, type } = properties;
  const { google: { charts, visualization } } = window;

  const capitalizedType = capitalize(type);
  const usingMaterialCharts = design === 'material';
  const constructorName = usingMaterialCharts ? capitalizedType : `${capitalizedType}Chart`;
  const chartText = chart.textContent;

  /* Test the dependencies are loaded */

  const googlePackage = usingMaterialCharts ? charts : visualization;
  const chartConstructor = googlePackage[constructorName];

  assert.ok(!!googlePackage,
    `The ${design} charts Google package should be available`);

  assert.ok(!!chartConstructor,
    `The ${type} charts constructor should be available`);

  /* Test the chart element */

  assert.ok(chart.classList.contains('google-chart'),
    `The chart should have the google-chart class`);

  assert.ok(chart.classList.contains(`${type}-chart`),
    `The chart should have the ${type}-chart class`);

  assert.ok(chart.chart instanceof chartConstructor,
    `The chart should have been created by ${constructorName}`);

  assert.ok(!!chart.querySelector('svg'),
    'The component should have an SVG rendered inside it');

  /* Test options */

  if (options.title) {
    assert.ok(chartText.indexOf(options.title) > -1,
      'The component should have the correct title option set on the chart');
  }

  /* Test data */

  if (data && type !== 'geo') {
    const dataTable = formatData(data);
    const columnsCount = dataTable.getNumberOfColumns();

    /* Check if each column label is in the charts. We can't test for data
    points since they aren't rendered outside of charts tooltips */

    for (let i = 0; i < columnsCount; i++) {
      const label = dataTable.getColumnLabel(i);

      assert.ok(chartText.indexOf(label) > -1,
        `The chart should contain the label '${label}'`);

    }
  }
}
