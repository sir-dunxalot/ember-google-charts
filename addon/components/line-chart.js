import Ember from 'ember';
import GoogleChart from './google-chart';

const { RSVP } = Ember;

export default GoogleChart.extend({
  type: 'line',

  renderChart({ charts, visualization }, data, options) {
    return new RSVP.Promise((resolve /*, reject */) => {
      const chart = new charts.Line(this.get('element'));
      const dataTable = visualization.arrayToDataTable(data);

      chart.draw(dataTable, charts.Line.convertOptions(options));

      resolve(chart);
    });
  }
});
