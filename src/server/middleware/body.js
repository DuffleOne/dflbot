import { Router } from 'express';
import { hasBody } from 'type-is';
import { json, urlencoded } from 'body-parser';

const router = Router();

export default router;

router.use(json());
router.use(urlencoded({ extended: true }));
router.use(checkBody);

function checkBody(req, res, next) {
	// has body, but wasn't parsed
	if (hasBody(req) && !req.body)
		next(new Error('unacceptable_content_type'));
	else
		next();
}
