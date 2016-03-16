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
  googlePackages: null,

  /* Properties */

  chart: null,
  classNameBindings: ['className'],
  classNames: ['google-chart'],
  data: null,

  className: computed('type', function() {
    return `${this.get('type')}-chart`;
  }),

  mergedOptions: computed('defaultOptions', 'options', function() {
    return $.extend({}, this.get('defaultOptions'), this.get('options'));
  }),

  /* Methods */

  loadPackages() {
    return new Ember.RSVP.Promise((resolve) => {
      window.google.load('visualization', '1.0', {
        callback: resolve,
        packages: this.get('googlePackages'),
      });
    });
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

  setupDependencies: on('didInsertElement', function() {
    const type = this.get('type');

    Ember.warn('You did not specify a chart type', type);

    if (window.google) {
      this.loadPackages().then(() => {
        this.sendAction('packagesDidLoad');
        this._renderChart();
      });
    } else {
      run.later(this, this.loadApi, 200);
    }
  }),

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

    this.renderChart(window.google, data, mergedOptions).then((chart) => {
      this.set('chart', chart);
      this.sendAction('chartDidRender', chart);
    });

    // $(window).on('resize', run.bind(this, this.renderChart));
  },

});
