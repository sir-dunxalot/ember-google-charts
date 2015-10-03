import Ember from 'ember';

const { computed, on, run } = Ember;

export default Ember.Component.extend({
  classNameBindings: ['className'],
  classNames: ['google-chart'],
  data: null,
  height: 300,
  title: null,
  type: 'bar',
  requiredGooglePackages: null,
  width: 400,

  className: computed('type', function() {
    return `${this.get('type')}-chart`;
  }),

  options: computed('height', 'title', 'width', function() {
    const { height, title, width } = this.getProperties(
      [ 'height', 'title', 'width' ]
    );

    return {
      height,
      title,
      width,
    }
  }),

  loadApi: on('didInsertElement', function() {
    const type = this.get('type');

    Ember.assert('You must specify a chart type', type);

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
    Ember.assert('You have created a chart type without a renderChart() method');
  },

  setupProperties: on('init', function() {
    this.setProperties({
      requiredGooglePackages: [],
    });
  }),

  _renderChart() {
    const data = this.get('data');

    Ember.assert('You have not passed any data to the chart', data);

    this.renderChart(window.google, data);
  },

});
