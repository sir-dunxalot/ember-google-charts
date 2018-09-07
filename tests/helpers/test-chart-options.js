import { later } from '@ember/runloop';
import { render, waitFor } from '@ember/test-helpers';

export default async function testChartOptions(assert, {
  context,
  data,
  options,
  template,
}) {
  assert.expect(1);

  if (!options) {
    options = {
      title: 'Some legit title',
    };
  }

  context.setProperties({
    data,
    options,
  });

  await render(template);

  await waitFor('.google-chart svg');

  await new Promise((resolve) => {
    later(resolve, 1000); // Sometimes tests fail without a little render time padding
  });

  const { title } = options;
  const $component = context.$('.google-chart');

  if (title) {
    assert.ok($component.text().indexOf(title) > -1,
      'The component should have the correct title option set on the chart');
  } else {
    assert.ok($component.text().indexOf(title) === -1,
      'The component should not have a title');
  }
}
