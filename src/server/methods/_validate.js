import validator from 'is-my-json-valid/require';

export default function createValidator(name) {
	const validate = validator(name, { greedy: true });

	return input => {
		if (validate(input))
			return;

		throw new Error('invalid_body');
	};
}
