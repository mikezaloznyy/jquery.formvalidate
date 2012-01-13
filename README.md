# jQuery Form Validate

## Introduction

jQuery Form Validate is a jQuery plugin that helps validate your HTML forms. It takes validation rules from the CSS styles that you apply to each input. For example, let's assume we have a `first_name` text input in our form. We want our first name field to be required, have a length of at least 5 characters and a maximum length of 128 characters. The CSS classes that would would apply to this input would be as follows:

* **Required**: `required`
* **Minimum length of 5 characters**: `min_length-5`
* **Maximum length of 128 characters**: `max_length-128`

Our HTML input element would look like this:

````
<input type="text" name="first_name" class="required min_length-5 max_length-128" />
````

If we decided that instead of a minimum length of 5 characters we wanted a minimum length of 4 characters, our CSS class would instead be `min_length-4`.

## Demo / Example

Access a [live demo](http://www.vmichnowicz.com/examples/formvalidate/index.html).

## Filters & Validations

jQuery Form Validate includes two main groups of functions, "filters" and "validations". Filters modify the value of an input before it is validated. The most common filter is `trim`. This function will remove all the leading and trailing white space of a form inputs value. This is most commonly used to make sure that a user actually entered something instead of just spaces. The full list of filters is as follows:

* *trim*(): Remove all leading and trailing white space
* *strtoupper*()`: Convert text to upper case
* *strtolower*(): Convert text to lower case

After all filters have been processed, then the validations are run. A validation takes the value of the form input, an optional list of parameters, and then does some processing. If the input is valid it returns `true`, else, if the validation fails, it returns `false`. The full list of validation functions along with their parameter requirements is as follows:

* *required*() -- Make it so form input is required.
* *between_numeric*( float **minimum**, float **maximum** ) -- See if a value is between a minimum and maximum value.
* *min_length*( int **minimum** ) -- Validate that a string is at least a certain number of characters in length.
* *max_length*( int **maximum** ) -- Validate that a string is no more than a certain number of characters in length.
* *min_options*( int **minimum** ) -- Make sure a user selects at least a provided number of checkboxes or multi-select form inputs.
* *max_options*( int **maximum** ) -- Make sure a user selects no more than a provided number of checkboxes or multi-select form inputs.
* *email*()`: Make sure a user entered a valid email
* *date*( string **format** ) -- Make sure the user entered a valid date in a valid date format. Format must be written as either "YYYYMMDD", "MMDDYYYY", or "DDMMYYYY".

## Breaking Down The CSS Classes

jQuery Form Validate uses the CSS classes assigned to your input elements to figure out which form validations to run. If you wish to prefix your form filter and validation CSS prefixes you may with the `cssFilterPrefix` and `cssValidationPrefix` properties:

````
$(document).ready(function() {
  $('form').formvalidate({
		cssFilterPrefix: 'new_filter_prefix_', // Add prefix of "new_filter_prefix_" for all filter functions
		cssValidationPrefix: '', // No CSS prefix (default setting)
	});
});
````

With these new prefixes defined above in place making an element required and running the trim filter would look like this:

````
<input type="text" name="middle_name" class="new_filter_prefix_trim required" />
````

## Complete Object Reference

When you initialize the plugin you can pass an object to override all of the default plugin settings. You can even add or replace all existing form validation functions.

### validateOnEvent [ string "*submit*" ]

Typically form validation is run after one submits a form or clicks a "submt" button. But default jQuery Form Validate will run form validation on submission of a form. However, if you would like form validation to run after a user clicks a button than you would want this event to be `click`. Then in the next property, `validateOnObject` you would pass a jQuery object containing that button.

### validateOnObject [ object *null* ]

But default this object is null and the form itself it used as the "validate on object". When our `validateOnEvent` is `submit` (the default) this works perfectly fine. However, if we want to run validation on the press of a button we would pass a jQuery object with our submit button to this property. Code for this would look something like:

````
$('a.my_submit_button')
````

### preProcess [ function *function(O)* ]

This function is fun before any form validation processing. By default this function removes all error classes, removes all error messages, and returns the main form validation object, `O`.

````
// Remove failure class from inputs
$(':input.' + settings.cssFailureClass).removeClass(settings.cssFailureClass);

// Remove all error messages
$('.' + settings.cssFailureClass).remove();

return O;
````

### postProcess [ function *function(O)* ]

This function is run after all form filter and validation rules are gathered. By default nothing is run in this function. However, the main form validation object must be returned.

````
return O;
````

### onSuccess [ function *function(O)* ]

This function is run after a form has successfully been validated. By default an alert message pops up. If you wanted to AJAX your form data this would be the place to add that logic.

````
alert('Great Success!');
return true;
````

### onFailure [ function *function(O)* ]

This function is run after a form fails validation. By default we loop through each input and find all the errors that were gathered. Then we append the error message inside the container DIV. Depending on how you layout your HTML forms this may need modification. This default code works best if you have one container DIV for each form element:

````
<div>
	<label for="name">
	<input name="name" class="required" title="Name" />
	<!--<span class="error">Error messages get appended at the end of the container DIV elements</span>-->
</div>
````

The default `onFailure` function is below:

````
// Loop through each form input form our validation object
$.each(O.inputs, function(inputIndex, inputObj) {
	// If this input did not pass validation
	if (inputObj.failure === true) {
		// Add failure class to input(s)
		$(':input[name="' + inputIndex + '"]').addClass( settings.cssFailureClass );
		// New error message element
		var el = $( settings.failureWrapper ).addClass( settings.cssFailureClass ).text( inputObj.errors[0] );
		$(':input[name="' + inputIndex + '"]:last').closest('div').append(el);
	}
});
````

### cssFailureClass [ string "*error*" ]

CSS class that gets added to all invalid form inputs and error messages.

### cssSuccessClass [ string "*success*" ]

CSS class that gets added to all form elements that pass validation.

### cssFilterPrefix [ string "*{empty string}*" ]

Prefix for form filters.

### cssValidationPrefix [ string "*{empty string}*" ]

Prefix for form validation functions.

### cssParamDelimiter [ string "*-*" ]

Used to designate parameters from within our CSS form validation functions. By default this is the `-` character. If we want to run the `between_numeric` validation function and have a minimum value of 5 and a maximum value of 10 the our CSS class would be `between_numeric-5-10`. Here we can see that the `-` character designates the start of the parameters and also serves to delimit each parameter.

### failureWrapper [ string "*\<span /\>*" ]

By default all error messages are wrapped in `<span />` tags. This results in error messages looking something like this:

````
<span class="error">First Name is required.</span>
````

### filters [ object *trim*, object *strtoupper*, object *strtolower* ]

All filters are run before validation functions. Filter function modify the input data and return the new data. Each function accepts two parameters, the form input, and an array of parameters. Even though no parameters are used for the default filter function, if you decided to create your own filter you can take advantage of this feature.

#### trim [ function *function(input, params)* ]

The trim function removes all leading and trailing whitespace.

#### strtoupper [ function *function(input, params)* ]

This function converts all text to uppercase.

#### strtolower [ function *function(input, params)* ]

This function converts all text to lowercase.

### validations [ object *between_numberic*, object *date*, object *email*, object *min_length*, object *max_length*, object *min_options*, object *max_options*, object *int*, object *float*, object *required*, object *less_than*, object *greater_than* ]

Validation functions simply check to see if an input is valid. They can the boolean `true` or `false`. Each function accepts two parameters, the form input, and an array of parameters. Each validation function has an associated error message template. The error message is built using the `title` attribute of the form input, the value of the form input, and/or the parameters passed to each validation function.

---

#### between_numeric [ object *text*, object *func* ]

This function is used to determine if the input value is between two provided numbers.

##### text [ string "*{0} must be between {2} and {3}.*" ]

* **{0}** Input `title` attribute
* **{2}** Minimum amount
* **{3}** Maximum amount

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### date [ object *text*, object *func* ]

This function checks to see if a valid date was submitted. Dates are accepted in one of three formats: "YYYY-MM-DD", "DD-MM-YYYY", "MM-DD-YYYY". Date parameter must be passed as either "YYYYMMDD", "DDMMYYYY", or "MMDDYYYY". The date string being validated may use a delimiter of either `-`, `/`, `,`, or `.`. 

##### text [ string "*{0} must be a valid date.*" ]

* **{0}** Input `title` attribute

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### email [ object *text*, object *func* ]

This function checks to see if a valid email was submitted. Email is validated using the regular expression `/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i`.

##### text [ string "*{1} is not a valid email.*" ]

* **{1}** Invalid user-provided email

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### min_length [ object *text*, object *func* ]

This function checks to see if an input is at least of a provided length.

##### text [ string "*{0} must be at least {2} characters.*" ]

* **{0}** Input `title` attribute
* **{2}** Minimum character length

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### max_length [ object *text*, object *func* ]

This function checks to see if an input is no longer than the provided number of characters.

##### text [ string "*{0} cannot be more than {2} characters.*" ]

* **{0}** Input `title` attribute
* **{2}** Maximum character length

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### min_options [ object *text*, object *func* ]

This function checks to see if multi-select or checkbox inputs have at least a provided number of selections.

##### text [ string "*Must select at least {2} options.*" ]

* **{2}** Minimum number of options

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### max_options [ object *text*, object *func* ]

This function checks to see if multi-select or checkbox inputs have no more than a provided number of selections.

##### text [ string "*Cannot select more than {2} options.*" ]

* **{2}** Maximum number of options

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### int [ object *text*, object *func* ]

This function checks to see if a valid integer was provided.

##### text [ string "*{0} must be a whole number (integer).*" ]

* **{0}** Input `title` attribute

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### required [ object *text*, object *func* ]

This function checks to see if any value was provided and the input is not blank.

##### text [ string "*{0} is required.*" ]

* **{0}** Input `title` attribute

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### less_than [ object *text*, object *func* ]

This function checks to see if a value is less than the provided number.

##### text [ string "*{0} must be less than {2}.*" ]

* **{0}** Input `title` attribute
* **{2}** Number input must be less than

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*

---

#### greater_than [ object *text*, object *func* ]

This function checks to see if a value is greater than the provided number.

##### text [ string "*{0} must be greater than {2}.*" ]

* **{0}** Input `title` attribute
* **{2}** Number input must be greater than

##### func [ function *function(input, params)* ]

*Please reference source for validation function code*