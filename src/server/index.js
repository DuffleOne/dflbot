import Express from 'express';
import camelcase from 'camelcase';
import snakecaseKeys from 'snakeize';
import * as Middleware from './middleware';
import * as Methods from './methods';

export default class Server {
	constructor(app, options = {}) {
		this.app = app;
		this.express = Express();
		this.options = options;
	}

	async setup() {
		await this._setupMiddleware();
	}

	run() {
		this.express.listen(this.options.port);

		console.info(`server listening on port ${this.options.port}`);
	}

	async _setupMiddleware() {
		const e = this.express;

		e.use(Middleware.types);
		e.use(Middleware.body);
		e.use('/1/:method', wrap(this._handler, this));
		e.use(Middleware.notFound);
		e.use(Middleware.error);
	}

	async _handler(req, res) {
		const method = Methods[camelcase(req.params.method)];

		if (!method)
			throw new Error('not_found');

		const context = {
			app: this.app,
			input: req.body
		};

		const output = await method(context);

		if (output === void 0 || output === null) {
			res.status(204);
			res.end();
			return;
		}

		res.status(200);
		res.json(snakecaseKeys(output));
	}
}

function wrap(handler, thisArg) {
	return (req, res, next) => {
		(async () => {
			try {
				await handler.call(thisArg, req, res);

				if (!res.headersSent)
					next();
			} catch (error) {
				next(error);
			}
		})();
	};
}
