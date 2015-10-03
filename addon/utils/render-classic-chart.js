import Ember from 'ember';

const { RSVP } = Ember;

export default function renderClassicChart({ charts, visualization }, data, options) {
  return new RSVP.Promise((resolve /*, reject */) => {
    const type = Ember.String.capitalize(this.get('type'));
    const chart = new visualization[`${type}Chart`](this.get('element'));
    const dataTable = visualization.arrayToDataTable(data);

    chart.draw(dataTable, options);

    resolve(chart);
  });
}
