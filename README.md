# Ember Google Charts

Ember Google Charts makes it very easy to implement [Google Charts](https://developers.google.com/chart/) in Ember CLI apps.

All dependencies are lazy loaded using the [Google JS API Loader](https://developers.google.com/loader/?hl=en), which intelligently caches requests between a user's sessions.

## Installation

```sh
ember install ember-google-charts
```

## Usage

- Charts
- [Actions](#actions)
  - [chartDidRender](#chartdidrender)
  - [packagesDidLoad](#packagesdidload)
- Custom Charts

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
  packagesDidLoad='selectCountry'
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

## Development

### Releases

Ensure tests are passing, then:

```sh
# Update github pages demo
ember github-pages:commit --message "Added some functionality"

# Release to NPM and Github
ember release # If patch
ember release --minor # If minor
ember release --major # If major
```
