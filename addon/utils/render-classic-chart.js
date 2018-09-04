import RSVP from 'rsvp';
import VisualizationNames from './visualization-names';

export default function renderClassicChart(data, options) {
  return new RSVP.Promise((resolve, reject) => {
    const { visualization } = window.google;
    const type = this.get('type');
    const visualizationName = VisualizationNames[type];
    const chart = new visualization[visualizationName](this.get('element'));
    const dataTable = visualization.arrayToDataTable(data);

    visualization.events.addListener(chart, 'error', reject);

    /* For charts that aren't immediately ready, listen for the
    ready event */

    if (type === 'geo') {
      visualization.events.addListener(chart, 'ready', function() {
        resolve(chart);
      });
    }

    chart.draw(dataTable, options);

    if (type !== 'geo') {
      resolve(chart);
    }
  });
}
