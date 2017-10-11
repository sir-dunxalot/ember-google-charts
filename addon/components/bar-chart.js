import GoogleChart from './google-chart';
import RenderChart from '../mixins/render-chart';

export default GoogleChart.extend(RenderChart, {
  type: 'bar',
  defaultDesign: 'material',
});
