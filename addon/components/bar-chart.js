// import Ember from 'ember';
import GoogleChart from './google-chart';

const { RSVP } = Ember;

export default GoogleChart.extend({
  chartType: 'bar',

  renderChart({ charts, visualization }, data) {
    return new RSVP.Promise((resolve, reject) => {
      const chart = new charts.Bar(this.get('element'));
      const dataTable = visualization.arrayToDataTable(data);
      const options = this.get('options');

      chart.draw(dataTable, charts.Bar.convertOptions(options));

      resolve(chart);
    });
  }
});
