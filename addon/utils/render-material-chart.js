import Ember from 'ember';

const { RSVP } = Ember;

export default function renderMaterialChart(data, options) {
  return new RSVP.Promise((resolve, reject) => {
    const { charts, visualization } = window.google;
    const type = Ember.String.capitalize(this.get('type'));
    const dataTable = visualization.arrayToDataTable(data);

    let chart = this.get('chart');

    if (!chart) {
      chart = new charts[type](this.get('element'));
      visualization.events.addListener(chart, 'error', reject);
    }

    chart.draw(dataTable, charts[type].convertOptions(options));

    resolve(chart);
  });
}
