import express from 'express';
const router = express.Router();
import { createShortUrl, getStats, redirectToOriginal ,getAllShortURLs ,deleteShortUrl } from '../controllers/urlController.js';


router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getStats);
router.get('/:shortcode', redirectToOriginal);
router.get("/links/getall", getAllShortURLs);
router.get("/links/:shortcode",deleteShortUrl);

export default router;
