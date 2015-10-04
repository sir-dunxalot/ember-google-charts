import Ember from 'ember';

const { RSVP } = Ember;

export default function renderMaterialChart({ charts, visualization }, data, options) {
  return new RSVP.Promise((resolve, reject) => {
    const type = Ember.String.capitalize(this.get('type'));
    const chart = new charts[type](this.get('element'));
    const dataTable = visualization.arrayToDataTable(data);

    visualization.events.addListener(chart, 'error', reject);

    chart.draw(dataTable, charts[type].convertOptions(options));

    resolve(chart);
  });
}
