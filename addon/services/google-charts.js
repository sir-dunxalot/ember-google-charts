import RSVP from 'rsvp';
import Service from '@ember/service';

export default Service.extend({
  language: 'en',

  init() {
    this._super(...arguments);

    this.googlePackages = this.googlePackages || ['corechart', 'bar', 'line', 'scatter'];
  },

  loadPackages() {
    const { google } = window;

    return new RSVP.Promise((resolve, reject) => {
      google.charts.load('current', {
        language: this.get('language'),
        packages: this.get('googlePackages'),
      });

      google.charts.setOnLoadCallback((ex) => {
        if (ex) { reject(ex); }

        resolve();
      });
    });
  },
});
