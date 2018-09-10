import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { VERSION } from '@ember/version';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import { warn } from '@ember/debug';

import renderChart from 'ember-google-charts/utils/render-chart';

const isUsingEmber2 = VERSION.match(/\b2\.\d+.\d+\b/g);

export default Component.extend({

  /* Services */

  googleCharts: service(),

  /* Actions */

  chartDidRender() {},
  packagesDidLoad() {},

  /* Options */

  design: 'classic', // 'classic' or 'material'
  data: null,
  options: null,
  type: null, // 'area', 'bar', 'line', etc

  /* Properties */

  chart: null,
  responsiveResize: true,

  defaultOptions: computed.reads('googleCharts.defaultOptions'),

  className: computed('type', function() {
    return `${this.get('type')}-chart`;
  }),

  /**
  The default options object with any properties specified
  in the options property overriding specific default options.

  @property mergedOptions
  @public
  */

  mergedOptions: computed('defaultOptions', 'options', function() {
    const defaultOptions = this.get('defaultOptions');
    const options = this.get('options');

    return $.extend({}, defaultOptions, options);
  }),

  /* Lifecycle hooks */

  init() {
    this._super(...arguments);
    this.classNameBindings = ['className'];
    this.classNames = ['google-chart'];
  },

  didInsertElement() {
    this._super(...arguments);
    this.get('setupDependencies').perform();

    /* If the Ember version is less than 2.0.0... */

    if (!isUsingEmber2) {
      this.addObserver('data', this, this._rerenderChart);
      this.addObserver('mergedOptions', this, this._rerenderChart);
    }

    if (this.get('responsiveResize')) {
      $(window).on(`resize.${this.get('elementId')}`, () => debounce(this, '_handleResize', 200));
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._rerenderChart();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownChart();
  },

  /* Methods */

  /**
  The method that components that extend this component should
  overwrite.

  @method renderChart
  @public
  */

  renderChart,

  setupDependencies: task(function* () {
    const { design, type } = this.getProperties('design', 'type');
    const options = { id: 'setup-dependencies' };

    warn(`You did not specify a chart type (e.g. 'bar', 'line', etc)`, type, {
      id: 'ember-google-charts.supply-type',
    });

    warn(`You did not specify a chart design ('material' or 'classic')`, design, {
      id: 'ember-google-charts.supply-type',
    });

    yield this.get('googleCharts').loadPackages();

    this.packagesDidLoad();
    this.get('_renderChart').perform();
  }),

  /* Private methods */

  _handleResize() {
    this.$().css({
      display: 'flex',
    });

    /* Classic charts have an extra parent div */

    let chartContainer = this.$().children().children().css('position') === 'absolute' ? this.$().children() : this.$().children().children();

    chartContainer.css({
      width: '',
      flex: 'auto',
    });

    this._rerenderChart();
  },

  _rerenderChart() {
    if (this.get('chart') && this.get('data')) {
      this.get('_renderChart').perform();
    }
  },

  _renderChart: task(function* () {
    const {
      data,
      design,
      element,
      mergedOptions,
      type
    } = this.getProperties('data', 'design', 'element', 'mergedOptions', 'type')

    const chart = yield this.renderChart(element, {
      data,
      design,
      options: mergedOptions,
      type,
    });

    this.set('chart', chart);
    this.chartDidRender(chart);
  }),

  _teardownChart() {
    const chart = this.get('chart');

    if (chart) {
      window.google.visualization.events.removeAllListeners(chart);
      chart.clearChart();
    }

    if (!isUsingEmber2) {
      this.removeObserver('data', this, this._rerenderChart);
      this.removeObserver('mergedOptions', this, this._rerenderChart);
    }

    $(window).off(`resize.${this.get('elementId')}`);
  },

});
