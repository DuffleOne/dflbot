export default function (req, res, next) {
	if (req.accepts('json'))
		next();
	else
		return res.sendStatus(406);
}
