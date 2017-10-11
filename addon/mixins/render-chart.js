import Ember from 'ember';
import renderMaterialChart from '../utils/render-material-chart';
import renderClassicChart from '../utils/render-classic-chart';

const { set, getProperties, isBlank } = Ember;

export default Ember.Mixin.create({

  init() {
    this._super(...arguments);
    this._setRenderChart();
  }, 

  _setRenderChart() {
    let {chart, defaultChart} = getProperties(this, ['chart', 'defaultChart'])
      , renderChartList = {'classic': renderClassicChart, 'material': renderMaterialChart}
      , renderChartSelected = renderChartList[isBlank(chart) ? defaultChart : chart];

    set(this, 'renderChart', renderChartSelected);
  },

});
