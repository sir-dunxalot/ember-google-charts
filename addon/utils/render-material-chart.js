import RSVP from 'rsvp';
import { capitalize } from '@ember/string';
import formatData from 'ember-google-charts/utils/format-data';

export default function renderMaterialChart(data, options) {
  return new RSVP.Promise((resolve, reject) => {
    const { google: { charts, visualization } } = window;
    const element = this.get('element');
    const type = capitalize(this.get('type'));

    let chart = this.get('chart');

    if (!chart) {
      chart = new charts[type](element);
      visualization.events.addListener(chart, 'error', reject);

      element.chart = chart;
    }

    chart.draw(formatData(data), charts[type].convertOptions(options));

    resolve(chart);
  });
}
