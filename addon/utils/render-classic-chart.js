import { warn } from '@ember/debug';
import renderChart from 'ember-google-charts/utils/render-chart';

export default function renderClassicChart(data, options) {
  warn(`renderClassicChart() has been deprecated. Use renderChart() instead. See https://github.com/sir-dunxalot/ember-google-charts#custom-charts`, {
    id: 'ember-google-charts.unified-render-util',
  });

  const {
    design,
    element,
    type,
  } = this;

  return renderChart(element, {
    data,
    design,
    options,
    type,
  });
}
