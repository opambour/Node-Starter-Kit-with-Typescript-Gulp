import path from 'path';

export const env = {
	NODE_ENV: 'development', // production or development
	PORT: 3000,
	VIEWS: path.join(__dirname, '../../views'),
	STATIC_FILES: path.join(__dirname, '../../public'),
	VIEW_ENGINE: 'njk',
	TRUST_PROXY: 1,
	LOCALHOST: '127.0.0.1',
	DB_URI: 'mongodb://127.0.0.1:27017/my_app_db',
	SECRET_KEY: 'TKRv0IJs&HYqrvagQ&!F!%V]Ww/4KiVs$s,<<MX',
	SESSION_NAME: 'ng5MaterialSessionName',
};
