import Ember from 'ember';

const { get, isPresent, computed } = Ember;

export default Ember.Mixin.create({

	/* Public properties */
  onSelect: undefined,
  onMouseOver: undefined,
  onMouseOut: undefined,	
	
	/* Private properties */
	_eventListeners: [],

  _dataTable: computed('data', function() {
    let data = get(this, 'data')
      , dataTable = google && google.visualization && google.visualization.arrayToDataTable(data);
    return dataTable;
  }),

	/* Private methods */
	_renderChartSuccess() {
		this._super(...arguments);
		this._removeEvents();
		this._addEvents();
	},

	_addEvents() {
		let chart = get(this, 'chart')
			, eventListeners = get(this, '_eventListeners')
			, events = this._getGoogleEvents();

		if (events) {
			this._addEvent(chart, eventListeners, events, 'select', this._onSelect.bind(this));
			this._addEvent(chart, eventListeners, events, 'onmouseover', this._onMouseEvent.bind(this, 'onMouseOver'));
			this._addEvent(chart, eventListeners, events, 'onmouseout', this._onMouseEvent.bind(this, 'onMouseOut'));
		}
	},

	_addEvent(chart, eventListeners, events, eventName, target) {
		eventListeners.pushObject( events.addListener(chart, eventName, target) );
	},

	_removeEvents() {
		let eventListeners = get(this, '_eventListeners')
			, events = this._getGoogleEvents();

		events && eventListeners.forEach(evt => events.removeListener(evt));
	},
	
	_getGoogleEvents() {
		return google && google.visualization && google.visualization.events;
	},

	_onSelect() {
		let chart = get(this, 'chart')
			, dataTable = get(this, '_dataTable')
			, selection = chart && chart.getSelection() || []
			, value = dataTable && 
					selection.map(item => this._getDataValue(dataTable, 'getValue', item.row, item.column))
			, formattedValue = dataTable && 
					selection.map(item => this._getDataValue(dataTable, 'getFormattedValue', item.row, item.column))
			, flatArray = arr => [].concat.apply([], arr)
			, cleanData = data => this._cleanData(flatArray(data));

		value && value.length && this.sendAction('onSelect', selection, cleanData(value), cleanData(formattedValue));
	},
	
	_onMouseEvent(evt, item) {
		let dataTable = get(this, '_dataTable')
			, cleanData = this._cleanData
			, value = dataTable && 
					this._getDataValue(dataTable, 'getValue', item.row, item.column)
			, formattedValue = dataTable && 
					this._getDataValue(dataTable, 'getFormattedValue', item.row, item.column);

		value && this.sendAction(evt, [item], cleanData(value), cleanData(formattedValue));
	},

	_getDataValue(dataTable, fc, row, column) {
		let i, values = []
			, columns = dataTable.getNumberOfColumns()
			, rows = dataTable.getNumberOfRows()
			, getValue = get(dataTable, fc).bind(dataTable);

		if (isPresent(row) && isPresent(column)) {
			values.push( getValue(row, column) );
		} else if (isPresent(row)) {
			for (i = 0; i < columns; i++) values.push( getValue(row, i) );
		} else if (isPresent(column)) {
			for (i = 0; i < rows; i++) values.push( getValue(i, column) );
		} else {
			return;
		}

		return values;
	},
	
	_cleanData(data) {
		return data && data.filter(d => isPresent(d));
	},
	
	/* Life cycle */
	willDestroyElement() {
		this._super(...arguments);
		this._removeEvents();
	},

});
