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

        /* If Google charts has been loaded, new calls
        to loadPackages can be resolved immediately */

        resolve();
      } else if (this.get('_loadInProgress')) {

        /* If this promise is created whilst google charts
        is being loaded, we can't resolve until it is loaded.
        Thus, we keep track of the resolve callbacks passed. */

        this.get('_callbacksAddedWhileLoading').push(resolve);
      } else {
        this.set('_calledLoad', true);

        window.google.charts.load('current', {
          language: this.get('language'),
          packages: this.get('googlePackages'),

          callback: () => {

            /* Once Google Charts has been loaded, mark the
            library as loaded and call all resolve callbacks
            passed to this promise before the Google Charts
            library had completed loading */

            this.set('_loadComplete', true);

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
