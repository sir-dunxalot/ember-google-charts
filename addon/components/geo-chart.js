import GoogleChart from './google-chart';
import renderClassicChart from 'ember-google-charts/utils/render-classic-chart';

export default GoogleChart.extend({
  type: 'geo',

  renderChart: renderClassicChart,
});
