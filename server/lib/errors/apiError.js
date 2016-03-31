import ExtendableError from 'es6-error';

/**
 * APIError should be extended for custom errors.
 */
export default class APIError extends ExtendableError {
	/**
	 * APIError constructor
	 * @param  {number} code    - Error code
	 * @param  {string} message - Error message
	 */
	constructor(code, message = 'Unknown error') {
		super(message);

		if (!code) {
			throw new Error('Must provide and API error code');
		}

		this.code = code;
	}
}

// Fields to be returned by `toJSON`
// Fields like `message` will not show up by default from Error objects.
const toJSONFields = ['code', 'message', 'name'];

const json = (value) => {
	return ~toJSONFields.indexOf(value);
};

// Avoid messing with `Error.prototype`
Object.defineProperty(APIError.prototype, 'toJSON', {
	value: function () {
		var alt = {};

		Object.getOwnPropertyNames(this).filter(json).forEach((key) => {
			alt[key] = this[key];
		}, this);

		return alt;
	},
	configurable: true,
	writable: true
});
