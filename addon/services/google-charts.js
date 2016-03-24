import Ember from 'ember';

export default Ember.Service.extend({
  googlePackages: ['corechart', 'bar', 'line', 'scatter'],
  language: 'en',

  _callbacksAddedWhileLoading: [],
  _loadComplete: false,
  _loadInProgress: false,

  loadPackages() {
    return new Ember.RSVP.Promise((resolve) => {
      if (this.get('_loadComplete')) {
        resolve();
      } else if (this.get('_loadInProgress')) {
        this.get('_callbacksAddedWhileLoading').push(resolve);
      } else {
        this.set('_calledLoad', true);

        window.google.charts.load('current', {
          language: this.get('language'),
          packages: this.get('googlePackages'),

          callback: () => {
            this.set('_loadComplete', true);

            console.log('here');
            resolve();

            this.get('_callbacksAddedWhileLoading').forEach((resolveCallback) => {
              resolveCallback();
            });
          },

        });
      }
    });
  },

});
