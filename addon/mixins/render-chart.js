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
    let {design, defaultDesign} = getProperties(this, ['design', 'defaultDesign'])
      , renderChartList = {'classic': renderClassicChart, 'material': renderMaterialChart}
      , renderChartSelected = renderChartList[isBlank(design) ? defaultDesign : design];

    set(this, 'renderChart', renderChartSelected);
  },

});
