import { Request, Response, NextFunction} from 'express';

export const IndexController = (req: Request, res: Response) => {
	const data = {
		title: 'Home',
		path: req.originalUrl,
	};

	// render with callbacks
	res.render('basic/index', data, (err: Error, template: string) => {
		if (err) {
			res.send(`${err.name}: ${err.message}`);
		}

		// render html
		res.status(200).send(template);
	});
};
