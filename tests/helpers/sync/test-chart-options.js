import Ember from 'ember';

const { run } = Ember;

export default function testChartOptions(assert, {
  context,
  data,
  options,
  template,
}) {
  const done = assert.async();

  if (!options) {
    options = {
      title: 'Some legit title',
    };
  }

  assert.expect(Object.keys(options).length);

  context.setProperties({
    data,
    options,
  });

  context.on('chartDidRender', (/* chart */) => {
    const { height, title } = options;

    run.later(this, function() {
      const $component = context.$('div:first-child');

      /* Check title */

      if (title) {

        assert.ok($component.html().indexOf(title) > -1,
          'The component should have the title option set on the chart');

      }

      /* Check height */

      if (height) {

        assert.equal($component.height(), height,
          'The component should have the title option set on the chart');

      }

      done();
    }, 100);
  });

  context.render(template);
}
