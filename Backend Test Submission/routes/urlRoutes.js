import express from 'express';
const router = express.Router();
import { createShortUrl, getStats, redirectToOriginal ,getAllShortURLs } from '../controllers/urlController.js';


router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getStats);
router.get('/:shortcode', redirectToOriginal);
router.get("/links/getall", getAllShortURLs); 

export default router;
