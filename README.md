Ember Google Charts [![Build Status](https://travis-ci.org/sir-dunxalot/ember-google-charts.svg)](https://travis-ci.org/sir-dunxalot/ember-google-charts)
======

Ember Google Charts makes it very easy to implement [Google Charts](https://developers.google.com/chart/) in Ember CLI apps.

All dependencies are lazy loaded using the [Google JS API Loader](https://developers.google.com/loader/?hl=en), which intelligently caches requests between a user's sessions.

![](https://ctoinsights.files.wordpress.com/2011/07/google-chart-tool.png)

## Installation

```sh
ember install ember-google-charts
```

## Usage

See the [demo app](http://sir-dunxalot.github.io/ember-google-charts/) here.

- [Charts](#charts)
  - [Default options](#default-options)
- [Actions](#actions)
  - [chartDidRender](#chartdidrender)
  - [packagesDidLoad](#packagesdidload)
- [Custom Charts](#custom-charts)
- [Content Security Policy](#content-security-policy)

### Charts

There are six types of chart supported out of the box:

- Area Charts
- Bar Charts
- Geo Charts
- Line Charts
- Pie Charts
- Scatter Charts

To add a chart to any route, simply add the relevant component:

```hbs
{{area-chart data=data options=options}}
```

Data and options should be in the format expected by the given chart, as detailed in the [Google Charts documentation](https://developers.google.com/chart/interactive/docs/).

For example:

```js
/* stats/route.js */

import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7],
    ];
  },

});
```

```js
/* stats/controller.js */

import Ember from 'ember';

export default Ember.Route.extend({

  options: {
    title: 'How I spend my days',
    height: 300,
    width: 400,

    animation: {
      startup: true,
      easing: 'inAndOut',
    },
  },

});
```

```hbs
{{!-- stats/template.hbs --}}

{{pie-chart data=data options=options}}
```

Where possible, this addon default to using Material Charts over Google's 'classic' design.

It's very easy to add non-default charts (e.g. table charts or gauge charts) - [see the custom charts docs here](#custom-charts)

#### Default Options

Default options for all charts can be set in the `GoogleChartComponent`. You can also set default options for individual charts, which will override the `GoogleChartComponent` default options.

**Default options are always merged with the options you pass into a component.** Passed in options will only override specific options properties, not the whole options object.

```js
/* components/google-chart.js */

import GoogleChart from 'ember-google-charts/components/google-chart';

export default GoogleChart.extend({

  defaultOptions: {
    backgroundColor: '#389fcc',
    annotations: {
      alwaysOutside: true,
    },
  },

});
```

### Actions

Two actions are available for you to hook on to:

#### chartDidRender

This fires when the Google chart has rendered and is ready for interaction via Google Charts public methods.

This action receives the `chart` object of the rendered chart.

```js
/* stats/controller.js */

import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    selectCountry(chart) {
      chart.setSelection('someValue');
    },
  },

});
```

```hbs
{{!-- stats/template.hbs --}}

{{geo-chart
  data=data
  options=options
  chartDidRender='selectCountry'
}}
```

#### packagesDidLoad

This fires when the Google chart has finished loading the required Google packages for a specific chart.

This action receives no params.

```js
/* stats/controller.js */

import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    checkGoogleExists() {
      // Do something
    },
  },

});
```

```hbs
{{!-- stats/template.hbs --}}

{{line-chart
  data=data
  options=options
  packagesDidLoad='checkGoogleExists'
}}
```

### Custom Charts

All chart components in this addon extend from a single core component: the `GoogleChartComponent`.

1. Find the type of chart in [the Google guides](https://developers.google.com/chart/interactive/docs/)
2. List the Google packages you require
3. Use the `renderMaterialChart` util or `renderClassicChart` util (depending on what Google supports for the chart type) to write a `renderChart` function

```js
/* components/gantt-chart.js */

import GoogleChart from 'ember-google-charts/components/google-chart';
import renderMaterialChart from 'ember-google-charts/utils/render-material-chart';

export default GoogleChart.extend({
  googlePackages: ['gantt'],
  type: 'gantt',

  renderChart: renderMaterialChart,
});
```

If preferred, you can write your own `renderChart` method. Use the [`renderMaterialChart` util as your guide](https://github.com/sir-dunxalot/ember-google-charts/blob/master/addon/utils/render-material-chart.js).

`renderChart` receives `window.google` as it's first argument and it must return a promise that resolves with the chart object (`resolve(chart)`).

### Content Security Policy

You will need to add the following to your app's [content security policy](https://github.com/rwjblue/ember-cli-content-security-policy) to mitigate CSP errors:

```js
contentSecurityPolicy: {
  'script-src': "'self' 'unsafe-eval' *.google.com *.gstatic.com",
  'style-src': "'self' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com",
  'font-src': "'self' *.gstatic.com *.googleapis.com",
}
```
