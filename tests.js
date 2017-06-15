const lib 		= require('./index')();
const assert 	= require('chai').assert;
const sinon 	= require('sinon');

const testObject = require('./test/mocks/test-object');
const testArrayByType = require('./test/mocks/test-array-by-type');
const testArrayByPayment = require('./test/mocks/test-array-by-payment');

describe('categoryObjectById: возвращает объект с категорией по ее id', function() {

	it('Является функцией', function() {
		assert.isFunction(lib.categoryObjectById)
	});

	it('Возвращает правильный результат, если передать id в виде строки, а не числа', function() {
		assert.deepEqual(lib.categoryObjectById("108", "ru"), testObject);
	});

	it('Возвращает правильный результат, если не передавать второй параметр "ru"', function() {
		assert.deepEqual(lib.categoryObjectById("108"), testObject);
	});

	it('Возвращает пустую строку, если данный ID не поддерживается', function() {
		assert.deepEqual(lib.categoryObjectById("108000"), "");
	});

});

describe('nameById: возвращает название категории на русском или английском', function() {

	lib.nameById("108", "ru")

	it('Является функцией', function() {
		assert.isFunction(lib.nameById)
	});

	it('Возвращает правильный результат, если передать id в виде строки, а не числа', function() {
		assert.deepEqual(lib.nameById("108", "ru"), testObject.item_name.ru);
	});

	it('Возвращает по умолчанию русское название, если не передавать второй параметр "ru"', function() {
		assert.deepEqual(lib.nameById(108), testObject.item_name.ru);
	});

	it('Возвращает английское название, если передать второй параметр "en"', function() {
		assert.deepEqual(lib.nameById(108, "en"), testObject.item_name.en);
	});

	it('Возвращает пустую строку, если данный ID не поддерживается', function() {
		assert.deepEqual(lib.nameById(122208), "");
	});

});

describe('allCategoriesByType: возвращает массив всех категорий по их slug`у', function() {

	it('Является функцией', function() {
		assert.isFunction(lib.allCategoriesByType)
	});

	it('Возвращает массив', function() {
		assert.isArray(lib.allCategoriesByType("utilities"));
	});

	it('Возвращает правильный результат', function() {
		assert.deepEqual(lib.allCategoriesByType("utilities"), testArrayByType);
	});

	it('Возвращает пустой массив, если данный тип не поддерживается', function() {
		assert.deepEqual(lib.allCategoriesByType("sdfhgdgsjgjfg"), []);
	});

});

describe('allCategoriesByPaymentType: возвращает массив всех категорий по типу оплаты', function() {

	it('Является функцией', function() {
		assert.isFunction(lib.allCategoriesByPaymentType)
	});

	it('Возвращает массив', function() {
		assert.isArray(lib.allCategoriesByPaymentType("yearly"));
	});

	it('Возвращает правильный результат', function() {
		assert.deepEqual(lib.allCategoriesByPaymentType("yearly"), testArrayByPayment);
	});

	it('Возвращает пустой массив, если данный тип не поддерживается', function() {
		assert.deepEqual(lib.allCategoriesByPaymentType("infinity"), []);
	});

});

describe('crimeAndSafetyIndex: возвращает тестовое определение уровня преступности на 2-х языках', function() {

	it('Является функцией', function() {
		assert.isFunction(lib.crimeAndSafetyIndex)
	});

	it('Возвращает объект', function() {
		assert.isObject(lib.crimeAndSafetyIndex(59));
	});

	it('Возвращает пустой объект, если индекс вне границ от 0 до 100', function() {
		assert.deepEqual(lib.crimeAndSafetyIndex(-1), {});
		assert.deepEqual(lib.crimeAndSafetyIndex(100000), {});
		assert.deepEqual(lib.crimeAndSafetyIndex(101), {});
	});

	it('Возвращает правильный результат, если передать индекс в виде строки, а не числа', function() {
		assert.deepEqual(lib.crimeAndSafetyIndex("15"), {"crime": "Очень низкий", "safety": "Очень высокий"});
	});

	it('Возвращает правильный результат при использовании чисел с точкой', function() {
		assert.deepEqual(lib.crimeAndSafetyIndex(18.99726889577763), {"crime": "Очень низкий", "safety": "Очень высокий"});
	});

	it('Возвращает правильный результат для всех 5 уровней на русском', function() {
		assert.deepEqual(lib.crimeAndSafetyIndex(18.99726889577763), {"crime": "Очень низкий", "safety": "Очень высокий"});
		assert.deepEqual(lib.crimeAndSafetyIndex(27.3995094714124), {"crime": "Низкий", "safety": "Высокий"});
		assert.deepEqual(lib.crimeAndSafetyIndex(41.484375), {"crime": "Умеренный", "safety": "Умеренный"});
		assert.deepEqual(lib.crimeAndSafetyIndex(70.6844038269848), {"crime": "Высокий", "safety": "Низкий"});
		assert.deepEqual(lib.crimeAndSafetyIndex(81.97853407557355), {"crime": "Очень высокий", "safety": "Очень низкий"});
	});

	it('Возвращает правильный результат для всех 5 уровней на английском', function() {
		assert.deepEqual(lib.crimeAndSafetyIndex(18.99726889577763, "en"), {"crime": "Very Low", "safety": "Very High"});
		assert.deepEqual(lib.crimeAndSafetyIndex(27.3995094714124, "en"), {"crime": "Low", "safety": "High"});
		assert.deepEqual(lib.crimeAndSafetyIndex(41.484375, "en"), {"crime": "Moderate", "safety": "Moderate"});
		assert.deepEqual(lib.crimeAndSafetyIndex(70.6844038269848, "en"), {"crime": "High", "safety": "Low"});
		assert.deepEqual(lib.crimeAndSafetyIndex(81.97853407557355, "en"), {"crime": "Very High", "safety": "Very Low"});
	});

});
