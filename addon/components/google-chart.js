import Ember from 'ember';

const { assert, computed, on, run } = Ember;

export default Ember.Component.extend({

  /* Actions */

  chartDidRender: null,
  packagesDidLoad: null,

  /* Options */

  defaultOptions: {},
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

  /* Methods */

  loadPackages() {
    return new Ember.RSVP.Promise((resolve) => {
      window.google.load('visualization', '1.0', {
        callback: resolve,
        packages: this.get('googlePackages'),
      });
    });
  },

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

  renderChart() {
    assert('You have created a chart type without a renderChart() method');
  },

  _teardownChart: on('willDestroyElement', function() {
    const chart = this.get('chart');

    if (chart) {
      chart.clearChart();
    }
  }),

  _renderChart() {
    const data = this.get('data');
    const defaultOptions = this.get('defaultOptions');
    const options = Object.assign(defaultOptions, this.get('options'));

    assert('You have not passed any data to the chart', data);

    this.renderChart(window.google, data, options).then((chart) => {
      this.sendAction('chartDidRender', chart);
      this.set('chart', chart);
    });

    // $(window).on('resize', run.bind(this, this.renderChart));
  },

});
