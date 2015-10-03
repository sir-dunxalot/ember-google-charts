import Ember from 'ember';

const { assert, computed, on, run } = Ember;

export default Ember.Component.extend({

  /* Options */

  height: null,
  options: null,
  title: null,
  type: null,
  requiredGooglePackages: null,
  width: null,

  /* Properties */

  chart: null,
  classNameBindings: ['className'],
  classNames: ['google-chart'],
  data: null,

  className: computed('type', function() {
    return `${this.get('type')}-chart`;
  }),

  defaultOptions: computed('height', 'title', 'width', function() {
    const { height, title, width } = this.getProperties(
      [ 'height', 'title', 'width' ]
    );

    return {
      height,
      title,
      width,
    };
  }),

  /* Methods */

  loadApi: on('didInsertElement', function() {
    const type = this.get('type');

    assert('You must specify a chart type', type);

    if (window.google) {
      const google = window.google;
      const packages = [`${type}`].concat(this.get('requiredGooglePackages'));

      google.load('visualization', '1.0', {
        callback: run.bind(this, this._renderChart),
        packages,
      });
    } else {
      run.later(this, this.loadApi, 200);
    }
  }),

  renderChart() {
    assert('You have created a chart type without a renderChart() method');
  },

  setupProperties: on('init', function() {
    this.setProperties({
      requiredGooglePackages: [],
    });
  }),

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

    Ember.assert('You have not passed any data to the chart', data);

    this.renderChart(window.google, data, options).then((chart) => {
      this.set('chart', chart);
    });

    // $(window).on('resize', run.bind(this, this.renderChart));
  },

});
