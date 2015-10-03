import Ember from 'ember';
import GoogleChart from './google-chart';

const { RSVP } = Ember;

export default GoogleChart.extend({
  googlePackages: ['bar'],
  type: 'bar',

  renderChart({ charts, visualization }, data, options) {
    return new RSVP.Promise((resolve /*, reject */) => {
      const chart = new charts.Bar(this.get('element'));
      const dataTable = visualization.arrayToDataTable(data);

      chart.draw(dataTable, charts.Bar.convertOptions(options));

      resolve(chart);
    });
  }
});
