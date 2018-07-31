'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/project-copilot';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-project-copilot';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.TEST_JWT_SECRET = process.env.TEST_JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';