const { getClientIp } = require('request-ip');
const rateLimit = require('express-rate-limit');

// Configure in-memory rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,                        // v7+: use `limit` (not `max`)
    standardHeaders: 'draft-7',       // sends RateLimit-* headers
    legacyHeaders: false,             // no X-RateLimit-* headers
    // Use API key or user id if you have one; otherwise fallback to an IPv6-safe key:
    keyGenerator: (req, res) => {
        // Example: prefer an API key header first (optional)
        const apiKey = req.get('x-api-key');
        if (apiKey) return apiKey;

        // Fallback: client IP via request-ip, normalized for IPv6
        const ip = getClientIp(req) || req.ip || 'unknown';
        // Optionally pass a subnet size (eg /64). If omitted, library default is used.
        return rateLimit.ipKeyGenerator(ip /*, 64 */);
    },
    handler: (req, res) => {
        const error = new Error('You have exceeded the maximum number of requests. Please try after some time.');
        error.status = 429;
        throw error;
    },
});

module.exports = limiter;