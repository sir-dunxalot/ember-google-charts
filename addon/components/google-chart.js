import Ember from 'ember';

const { assert, computed, observer, on, run, $ } = Ember;

export default Ember.Component.extend({

  /* Actions */

  chartDidRender: null,
  packagesDidLoad: null,

  /* Options */

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
  classNameBindings: ['className'],
  classNames: ['google-chart'],
  data: null,
  googleCharts: Ember.inject.service(),

  className: computed('type', function() {
    return `${this.get('type')}-chart`;
  }),

  mergedOptions: computed('defaultOptions', 'options', function() {
    const defaultOptions = this.get('defaultOptions');
    const options = this.get('options');

    return $.extend({}, defaultOptions, options);
  }),

  /* Methods */

  didRender() {
    this._super(...arguments);
    this.setupDependencies();
  },

  renderChart() {
    assert('You have created a chart type without a renderChart() method');
  },

  /* TODO - Remove observer in favor of component lifecycle hooks */

  rerenderChart: observer('data', 'mergedOptions', function() {
    const chart = this.get('chart');

    if (chart && this.get('data')) {
      this._renderChart();
    }
  }),

  setupDependencies() {
    const type = this.get('type');

    Ember.warn('You did not specify a chart type', type);

    this.get('googleCharts').loadPackages().then(() => {
      this.sendAction('packagesDidLoad');
      this._renderChart();
    });
  },

  _teardownChart: on('willDestroyElement', function() {
    const chart = this.get('chart');

    if (chart) {
      window.google.visualization.events.removeAllListeners(chart);
      chart.clearChart();
    }
  }),

  _renderChart() {
    const data = this.get('data');
    const mergedOptions = this.get('mergedOptions');

    this.renderChart(data, mergedOptions).then((chart) => {
      this.set('chart', chart);
      this.sendAction('chartDidRender', chart);
    });
  },

});
