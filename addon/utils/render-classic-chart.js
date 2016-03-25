import Ember from 'ember';

const { RSVP } = Ember;

export default function renderClassicChart(data, options) {
  return new RSVP.Promise((resolve, reject) => {
    const { visualization } = window.google;
    const type = this.get('type');
    const capitalizedType = Ember.String.capitalize(this.get('type'));
    const chart = new visualization[`${capitalizedType}Chart`](this.get('element'));
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
