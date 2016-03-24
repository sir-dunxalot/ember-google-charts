import GoogleChart from './google-chart';
import renderMaterialChart from 'ember-google-charts/utils/render-material-chart';

export default GoogleChart.extend({
  // googlePackages: ['line'],
  type: 'line',

  renderChart: renderMaterialChart,
});
