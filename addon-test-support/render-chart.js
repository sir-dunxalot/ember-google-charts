import { later } from '@ember/runloop';
import { find, render, waitFor } from '@ember/test-helpers';

export default async function renderChart(template, options = {}) {

  await render(template);

  await waitFor('.google-chart svg');

  /* Sometimes tests fail without a little render time padding, so wait... */

  await new Promise((resolve) => {
    later(resolve, options.delay || 1000);
  });

  return find('.google-chart');
}
