import { run } from '@ember/runloop';

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
    const { title } = options;

    run.later(this, function() {
      const $component = context.$('.google-chart');

      /* Check title */

      if (title) {

        assert.ok($component.text().indexOf(title) > -1,
          'The component should have the correct title option set on the chart');

      }

      done();
    }, 200);
  });

  context.render(template);
}
