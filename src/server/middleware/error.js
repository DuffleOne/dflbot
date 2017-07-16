import errors from './errors.json';
import snakecaseKeys from 'snakeize';

export default function (error, req, res, next) {
	typeof next; // handles linting issue

	if (typeof error.code !== 'string') {
		error = {'code': error.message};
	}

	// eslint-disable-next-line no-magic-numbers
	res.status(errors[error.code] || 500);
	res.json(snakecaseKeys(error));
}
