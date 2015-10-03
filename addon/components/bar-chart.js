// import Ember from 'ember';
import GoogleChart from './google-chart';

export default GoogleChart.extend({
  chartType: 'bar',

  renderChart(google, data) {
    const dataTable = google.visualization.arrayToDataTable(data);
    const options = this.get('options');
    const chart = new google.charts.Bar(this.get('element'));

    chart.draw(dataTable, options);
  }
});
