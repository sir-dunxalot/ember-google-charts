import GoogleChart from './google-chart';
import RenderChart from '../mixins/render-chart';

export default GoogleChart.extend(RenderChart, {
  type: 'pie',
  defaultChart: 'classic',
});
