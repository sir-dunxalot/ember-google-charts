import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';

const { $, assert, computed, inject: { service } } = Ember;
const isUsingEmber2 = Ember.VERSION.match(/\b2\.\d+.\d+\b/g);

export default Ember.Component.extend(ResizeAware, {
  resizeService: service('resize'),

  /* Actions */

  chartDidRender: null,
  packagesDidLoad: null,

  /* Options */

  data: null,
  defaultOptions: {
    animation: {
      duration: 500,
      startup: false,
    },
  },
  options: null,
  type: null,

  /* Properties */

  chart: null,
  responsiveResize: true,
  classNameBindings: ['className'],
  classNames: ['google-chart'],
  googleCharts: Ember.inject.service(),

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

  /* Methods */

  didInsertElement() {
    this._super(...arguments);
    this.setupDependencies();

    /* If the Ember version is less than 2.0.0... */

    if (!isUsingEmber2) {
      this.addObserver('data', this, this._rerenderChart);
      this.addObserver('mergedOptions', this, this._rerenderChart);
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._rerenderChart();
  },

  setupDependencies() {
    const type = this.get('type');
    const options = { id: 'setup-dependencies' };

    Ember.warn('You did not specify a chart type', type, options);

    this.get('googleCharts').loadPackages().then(() => {
      this.sendAction('packagesDidLoad');
      this._renderChart();
    });
  },

  /**
  The method that components that extend this component should
  overwrite.

  @method renderChart
  @public
  */

  renderChart() {
    assert('You have created a chart type without a renderChart() method');
  },

  debouncedDidResize() {
    if (this.get('responsiveResize')) {
      this._rerenderChart();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownChart();
  },

  _rerenderChart() {
    if (this.get('chart') && this.get('data')) {
      this._renderChart();
    }
  },

  _renderChart() {
    const data = this.get('data');
    const mergedOptions = this.get('mergedOptions');

    this.renderChart(data, mergedOptions).then((chart) => {
      this.set('chart', chart);
      this.sendAction('chartDidRender', chart);
    });
  },

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
  },

});
