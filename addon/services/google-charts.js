import RSVP from 'rsvp';
import Service from '@ember/service';

export default Service.extend({
  language: 'en',

  init() {
    this._super(...arguments);

    this.googlePackages = this.googlePackages || ['corechart', 'bar', 'line', 'scatter'];
    this.defaultOptions = this.defaultOptions || {
      animation: {
        duration: 500,
        startup: false,
      },
    };
  },

  loadPackages() {
    const { google: { charts, visualization } } = window;

    return new RSVP.Promise((resolve, reject) => {
      if (visualization !== undefined) {
        resolve();
      } else {
        charts.load('current', {
          language: this.get('language'),
          packages: this.get('googlePackages'),
        });

        charts.setOnLoadCallback((ex) => {
          if (ex) { reject(ex); }

          resolve();
        });
      }
    });
  },
});
