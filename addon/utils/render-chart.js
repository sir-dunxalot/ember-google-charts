import RSVP from 'rsvp';
import { capitalize } from '@ember/string';
import getVisualizationName from 'ember-google-charts/utils/get-visualization-name';

import formatData from 'ember-google-charts/utils/format-data';

export default function renderChart(element, { data, type, design = 'classic', options = {} }) {
  return new RSVP.Promise((resolve, reject) => {
    const { google: { charts, visualization } } = window;

    const capitalizedType = capitalize(type);
    const isAsyncChart = type === 'geo';
    const isMaterialChart = design === 'material';
    const constructorName = isMaterialChart ? capitalizedType : getVisualizationName(type);

    const googlePackage = isMaterialChart ? charts : visualization;
    const chartConstructor = googlePackage[constructorName];

    function formatOptions(options) {
      return isMaterialChart ? charts[capitalizedType].convertOptions(options) : options;
    }

    /* Create the chart */

    const chart = new chartConstructor(element);

    /* For charts that are are created asyncronously, listen for the
    ready event */

    if (isAsyncChart) {
      visualization.events.addListener(chart, 'ready', function() {
        resolve(chart);
      });
    }

    /* Make sure errors in render are caught */

    visualization.events.addListener(chart, 'error', reject);

    /* Make the Google Chart object publically available (e.g. for use in tests) */

    element.chart = chart;

    /* Render the chart */

    chart.draw(formatData(data), formatOptions(options));

    if (!isAsyncChart) {
      resolve(chart);
    }
  });
}
