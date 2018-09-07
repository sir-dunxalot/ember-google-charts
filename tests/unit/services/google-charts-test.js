import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | google charts', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const service = this.owner.lookup('service:google-charts');

    assert.ok(service);
  });
});
