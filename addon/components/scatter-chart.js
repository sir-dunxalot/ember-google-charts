import Ember from 'ember';
import GoogleChart from './google-chart';

const { RSVP } = Ember;

export default GoogleChart.extend({
  googlePackages: ['scatter'],
  type: 'scatter',

  renderChart({ charts, visualization }, data, options) {
    return new RSVP.Promise((resolve /*, reject */) => {
      const chart = new charts.Scatter(this.get('element'));
      const dataTable = visualization.arrayToDataTable(data);

      chart.draw(dataTable, charts.Scatter.convertOptions(options));

      resolve(chart);
    });
  }
});
