import Ember from 'ember';

export default function testChartRendering(assert, {
  context,
  data,
  template,
  type,
  usingMaterialCharts,
}) {
  const capitalizedType = Ember.String.capitalize(type);
  const constructorName = usingMaterialCharts ? capitalizedType : `${capitalizedType}Chart`;
  const done = assert.async();

  assert.expect(6);

  context.set('data', data);

  context.on('chartDidRender', (chart) => {
    const $component = context.$('div:first-child');
    const { google } = window;
    const googlePackage = usingMaterialCharts ? google.charts : google.visualization;
    const constructor = googlePackage[constructorName];

    assert.ok(!!googlePackage,
      `The required Google package should have loaded`);

    assert.ok(!!constructor,
      `The ${constructorName} visualization constructor should be available`);

    assert.ok($component.hasClass(`${type}-chart`),
      `The component should have the ${type}-chart class`);

    assert.ok($component.hasClass('google-chart'),
      'The component should have the google-chart class');

    assert.equal(chart.constructor, constructor,
      `The component should have a public chart property created by ${constructorName}`);

    assert.ok($component.find('svg').length,
      'The component should have an SVG rendered inside it');

    done();
  });

  context.render(template);
}
