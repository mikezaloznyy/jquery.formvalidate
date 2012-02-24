/**
 * jQuery Form Validate Russian error message translations (translation by https://github.com/mzaloznyy)
 *
 * Include this file *after* the jquery.formvalidate.js in document <head>
 */
jQuery.extend(true, jQuery.formvalidate, {
	localization: {
		ru: {
			'default': '{0} is invalid.',
			between_numeric: '{0} должен быть между {2} и {3}.',
			date: '{0} must be a valid date.',
			email: '{1} is not a valid email.',
			length: '{0} must be exactly {2} characters.',
			min_length: '{0} must be at least {2} characters.',
			max_length: '{0} cannot be more than {2} characters.',
			options: 'Must select exactly {2} options.',
			min_options: 'Must select at least {2} options.',
			max_options: 'Cannot select more than {2} options.',
			'int': '{0} must be a whole number (integer).',
			'float': '{0} must be a valid number.',
			required: '{0} is required.',
			required_if: '{0} is required.',
			less_than: '{0} must be less than {2}.',
			greater_than: '{0} must be greater than {2}.'
		}
	}
});
