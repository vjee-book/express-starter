module.exports = {
	"development": {
		"PORT": 8892,
		"DB_HOST":"localhost",
		"DB_USERNAME":"postgres",
		"DB_PASSWORD":"root",
		"DB_NAME":"blue_apps",
		"DB_PORT":5432,
		"AWS_KEY":"8JHJHGTFGHJKJJ",
		
	},
	"production": {
		"PORT": 8080,
		"DB_HOST":"localhost",
		"DB_USERNAME":"postgres",
		"DB_PASSWORD":"root",
		"DB_NAME":"blue_apps",
		"DB_PORT":5432,
		"AWS_KEY":"8JHJHGTFGHJKJJ",
	},
	"local": {
		"PORT": 3000,
		"DB_HOST":"localhost",
		"DB_USERNAME":"postgres",
		"DB_PASSWORD":"root",
		"DB_NAME":"blue_apps",
		"DB_PORT":5432,
		"AWS_KEY":"8JHJHGTFGHJKJJ",
		
	}
}[process.env.NODE_ENV || "local"]