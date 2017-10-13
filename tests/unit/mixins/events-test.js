import Ember from 'ember';
import EventsMixin from 'ember-google-charts/mixins/events';
import { module, test } from 'qunit';

module('Unit | Mixin | events');

// Replace this with your real tests.
test('it works', function(assert) {
  let EventsObject = Ember.Object.extend(EventsMixin);
  let subject = EventsObject.create();
  assert.ok(subject);
});
