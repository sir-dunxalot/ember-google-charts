import { warn } from '@ember/debug';
import renderChart from 'ember-google-charts/utils/render-chart';

export default function renderMaterialChart(data, options) {
  warn(`renderMaterialChart() has been deprecated. Use renderChart() instead. See https://github.com/sir-dunxalot/ember-google-charts#custom-charts`, {
    id: 'ember-google-charts.unified-render-util',
  });

  const {
    design,
    element,
    type,
  } = this.getProperties('design', 'element', 'type');

  return renderChart(element, {
    data,
    design,
    options,
    type,
  });
}
