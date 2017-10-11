import Ember from 'ember';
import RenderChartMixin from 'ember-google-charts/mixins/render-chart';
import { module, test } from 'qunit';

module('Unit | Mixin | render chart');

// Replace this with your real tests.
test('it works', function(assert) {
  let RenderChartObject = Ember.Object.extend(RenderChartMixin);
  let subject = RenderChartObject.create();
  assert.ok(subject);
});
