import RSVP from 'rsvp';
import Service from '@ember/service';

export default Service.extend({
  language: 'en',

  init() {
    this._super(...arguments);
    this._startLoad();
  },

  _startLoad() {
    const { google } = window;

    google.charts.load('current', {
      language: this.get('language'),
      packages: this.get('googlePackages'),
    });
  },

  loadPackages() {
    const { google } = window;

    return new RSVP.Promise((resolve, reject) => {
      google.charts.setOnLoadCallback((ex) => {
        if (ex) {
          reject(ex);
        }
        
        resolve();
      });
    });
  },
});
