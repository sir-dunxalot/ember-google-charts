import Ember from 'ember';

const { $, assert, computed, run: { debounce, }, } = Ember;
const isUsingEmber2 = Ember.VERSION.match(/\b2\.\d+.\d+\b/g);

export default Ember.Component.extend({

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
  classNameBindings: ['className'],
  classNames: ['google-chart'],
  googleCharts: Ember.inject.service(),
  responsiveResize: true,

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

    if (this.get('responsiveResize')) {
      $(window).on(`resize.${this.get('elementId')}`, () => debounce(this, '_handleResize', 200));
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

  willDestroyElement() {
    this._super(...arguments);
    this._teardownChart();
  },

  _rerenderChart() {
    if (this.get('chart') && this.get('data')) {
      this._renderChart();
    }
  },

  _handleResize() {
    this.$().css({ display: 'flex' });

    // Classic charts have an extra parent div
    let chartContainer = this.$().children().children().css('position') === 'absolute' ? this.$().children() : this.$().children().children();
    chartContainer.css({ width: '', flex: 'auto' });

    this._rerenderChart();
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
      if (chart.clearChart) {
        chart.clearChart();
      }
    }

    if (!isUsingEmber2) {
      this.removeObserver('data', this, this._rerenderChart);
      this.removeObserver('mergedOptions', this, this._rerenderChart);
    }

    $(window).off(`resize.${this.get('elementId')}`);
  },

});
