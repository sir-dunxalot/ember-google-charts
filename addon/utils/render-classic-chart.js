import RSVP from 'rsvp';
import VisualizationNames from './visualization-names';
import formatData from 'ember-google-charts/utils/format-data';

export default function renderClassicChart(data, options) {
  return new RSVP.Promise((resolve, reject) => {
    const { google: { visualization } } = window;
    const element = this.get('element');
    const type = this.get('type');
    const visualizationName = VisualizationNames[type];
    const isAsyncChart = type === 'geo';

    let chart = this.get('chart');

    if (!chart) {
      chart = new visualization[visualizationName](element);
      visualization.events.addListener(chart, 'error', reject);

      element.chart = chart;
    }

    /* For charts that are are created asyncronously, listen for the
    ready event */

    if (isAsyncChart) {
      visualization.events.addListener(chart, 'ready', function() {
        resolve(chart);
      });
    }

    /* Draw the chart*/

    chart.draw(formatData(data), options);

    if (!isAsyncChart) {
      resolve(chart);
    }
  });
}
