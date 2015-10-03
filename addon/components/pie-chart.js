import Ember from 'ember';
import GoogleChart from './google-chart';

const { RSVP } = Ember;

export default GoogleChart.extend({
  googlePackages: ['corechart'],
  type: 'pie',

  renderChart({ charts, visualization }, data, options) {
    return new RSVP.Promise((resolve /*, reject */) => {
      const chart = new visualization.PieChart(this.get('element'));
      const dataTable = visualization.arrayToDataTable(data);

      chart.draw(dataTable, options);

      resolve(chart);
    });
  }
});
