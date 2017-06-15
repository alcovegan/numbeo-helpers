const categories = require('./data/categories');

module.exports = (opts) => {

	var options = opts || {};
	var debug 	= options.debug || false;

function internalHelpers() {

	const supportedPaymentTypes = [...new Set(categories.map(cat => cat.payment_type))];
	const supportedIds 			= [...new Set(categories.map(cat => cat.id))]
	const supportedTypes 		= [...new Set(categories.map(cat => cat.slug))];

	return {
		supportedIds,
		supportedPaymentTypes,
		supportedTypes
	}
}

function getCategoryById(id) {
	if(typeof id === 'string') id = Number(id);

	if(internalHelpers().supportedIds.indexOf(id) === -1) {

		debug === true
			? console.error("This id is not supported.")
			: null

		return ''
	} else {
		return categories.find(category => category.id === id)
	}
}

function getNameById(id, locale = 'ru') {

	if(typeof id === 'string') id = Number(id);

	if(internalHelpers().supportedIds.indexOf(id) === -1) {

		debug === true
			? console.error("This id is not supported.")
			: null

		return ''
	} else {
		return categories.find(category => category.id === id).item_name[locale]
	}
}

// supported types:
// restaurants, markets, transportation, utilities, sportsleisure, childcare, fashion, rent, apartments, finance
function getAllCategoriesByType(type) {

	if(internalHelpers().supportedTypes.indexOf(type) === -1) {

		debug === true
			? console.log("This type is not supported.")
			: null

		return []
	} else {
		return categories.filter(category => category.slug === type)
	}
}

// supported types: oneoff, monthly, yearly
function getAllCatsByPaymentType(payment_type) {

	if(internalHelpers().supportedPaymentTypes.indexOf(payment_type) === -1) {

		debug === true
			? console.log("This payment type is not supported.")
			: null

		return []
	} else {
		return categories.filter(category => category.payment_type === payment_type)
	}
}

function getCrimeIndex(number, locale = 'ru') {

	if(number < 0 || number > 100) {

		debug === true
			? console.log("Index must be in range from 0 to 100.")
			: null

		return {}
	}

	if(typeof id === 'string') id = Number(id);

	let texts = {
		"verylow": {
			"ru": "Очень низкий",
			"en": "Very Low"
		},
		"low": {
			"ru": "Низкий",
			"en": "Low"
		},
		"moderate": {
			"ru": "Умеренный",
			"en": "Moderate"
		},
		"high": {
			"ru": "Высокий",
			"en": "High"
		},
		"veryhigh": {
			"ru": "Очень высокий",
			"en": "Very High"
		}
	}

	if(number <= 20) {
		return {
			"crime": texts.verylow[locale],
			"safety": texts.veryhigh[locale]
		}
	} else if (number > 20 && number < 40) {
		return {
			"crime": texts.low[locale],
			"safety": texts.high[locale]
		}
	} else if (number > 40 && number < 60) {
		return {
			"crime": texts.moderate[locale],
			"safety": texts.moderate[locale]
		}
	} else if (number > 60 && number < 80) {
		return {
			"crime": texts.high[locale],
			"safety": texts.low[locale]
		}
	} else if (number > 80) {
		return {
			"crime": texts.veryhigh[locale],
			"safety": texts.verylow[locale]
		}
	}

}

	return {
		categoryObjectById: getCategoryById,
		nameById: getNameById,
		allCategoriesByType: getAllCategoriesByType,
		allCategoriesByPaymentType: getAllCatsByPaymentType,
		crimeAndSafetyIndex: getCrimeIndex
	}
}
