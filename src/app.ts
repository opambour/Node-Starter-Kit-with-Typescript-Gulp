import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
// import serveFavicon from 'serve-favicon';
import nunjuckjs from 'nunjucks';
import methodOverride from 'method-override';

import { env } from './config/app.env';

import { BasicRouter } from './routes/basic.routes';

class App {
	// initialize express app
	public app: express.Application;

	constructor() {
		this.app = express();
		// this.mongooseConnection();
		this.setMiddleware();
		this.configureMiddleware();
		this.routing();
	}

	// ORM Connection: eg. mongoose
	// private mongooseConnection() {

	// }

	// set middleware
	private setMiddleware() {
		this.app.set('trust proxy', env.TRUST_PROXY); // trust first proxy
		this.app.set('port', env.PORT);
		this.app.set('views', env.VIEWS);
		this.app.set('static files', env.STATIC_FILES);
		this.app.set('view engine', env.VIEW_ENGINE);
	}

	// configure middleware
	private configureMiddleware() {
		// secure your app with helmet
		this.app.use(helmet());
		// use favicon
		// app.use(favicon(path.join(__dirname, 'public', 'img/MEN_logo.png')));

		// serving static files: HTML files, images, fonts, css and so on
		this.app.use(express.static(this.app.get('static files')));

		// body-parser
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true,
		}));
		// cookie parser
		this.app.use(cookieParser());
		// session
		this.app.use(session({
			secret: env.SECRET_KEY,
			name: env.SESSION_NAME,
			saveUninitialized: true, // create session until something stored
			resave: false, // don't save session if unmodified
			cookie: { maxAge: 300000 }, // 60000 milliseconds = 1 minute, 300000 is 5 minutes
		}));

		this.app.use(methodOverride('_method'));

		// Middleware: configure our app to handle CORS requests
		this.app.use(cors());

		// configure nunjucks
		const njkEnv = nunjuckjs.configure(this.app.get('views'), {
			// options
			autoescape: true, // (default: true) controls if output with dangerous characters are escaped automatically
			throwOnUndefined: true, // (default: false) throw errors when outputting a null/undefined value
			trimBlocks: true, // (default: false) automatically remove trailing newlines from a block/tag
			lstripBlocks: true,
			noCache: true, // (default: false) never use a cache and recompile templates each time (server-side)
			/* (default: false) reload templates when they are changed (server-side). To use watch, make sure optional
			** dependency chokidar is installed.*/
			watch: true,
			express: this.app,
		});

		// custom njk filters
		njkEnv.addFilter('count_words', (variable: string): number => {
			return variable.split(' ').length;
		});

		// production
		process.env.NODE_ENV = env.NODE_ENV;
		console.log('NODE_ENV:', process.env.NODE_ENV);
		if (process.env.NODE_ENV === 'production') {
			this.app.use(compression());
		} else if (process.env.NODE_ENV === 'development') {
			// log all request
			// this.app.use(morgan('combined')); // Apache combined format to STDOUT
			// this.app.use(morgan('tiny'));
			this.app.use(morgan('dev'));
			// this.app.use(morgan('common'));
		}
	}

	// routing
	private routing() {
		// basic routes
		this.app.use('/', BasicRouter);
		// admin routes

		// user routes

		// custom 403
		// this.expressApp.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
		// 		if (err.status === 403) {
		// 			return res.render('error/403', { title: 'Forbidden', path: req.originalUrl });
		// 		}

		// 	next();
		// });

		// // custom 404 page
		// this.expressApp.use((req: express.Request, res: express.Response) => {
		// 	res.status(404).render('error/404',
		// 		{ title: 'Page Not Found', urlAttempted: req.url, path: req.originalUrl },
		// 	);
		// });

		// custom 500 page: comment this during production
		// this.app.use(function (err, req, res, next) {
		//     res.status(500); // internal server error
		//     res.render('errors/500',
		//     { title: '500 - Internal Server Error', path: req.originalUrl, errors: err.stack });
		//     //console.error(err.stack);
		//     next(err.stack);
		// });
	}
}

export default new App().app;
