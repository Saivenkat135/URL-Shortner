
import Log from "../middlewares/logger.js";
import { nanoid } from "nanoid";

import Url from "../models/url.js"

const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const shortCode = shortcode || nanoid(6);
  const expiry = new Date(Date.now() + validity * 60000);

  try {
    const existing = await Url.findOne({ shortcode: shortCode });
    if (existing) {
      await Log("backend", "error", "shorten", "Shortcode collision");
      return res.status(409).json({ error: "Shortcode already exists" });
    }

    const newUrl = new Url({
      originalUrl: url,
      shortcode: shortCode,
      expiry
    });

    await newUrl.save();
    await Log("backend", "info", "shorten", `Short URL created for ${url}`);

    res.status(201).json({
      shortLink: `https://url-shortner-backend-chi.vercel.app/${shortCode}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    await Log("backend", "error", "shorten", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) {
      await Log("backend", "error", "stats", "Shortcode not found");
      return res.status(404).json({ error: "Shortcode not found" });
    }

    res.json({
      originalUrl: urlDoc.originalUrl,
      createdAt: urlDoc.createdAt,
      expiry: urlDoc.expiry,
      clickCount: urlDoc.clicks.length,
      clicks: urlDoc.clicks
    });
  } catch (err) {
    await Log("backend", "error", "stats", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const redirectToOriginal = async (req, res) => {
  const { shortcode } = req.params;
  try {
    const urlDoc = await Url.findOne({ shortcode });

    if (!urlDoc) {
      await Log("backend", "error", "redirect", "Shortcode not found");
      return res.status(404).json({ error: "Shortcode not found" });
    }

    if (urlDoc.expiry < new Date()) {
      await Log("backend", "error", "redirect", "Shortcode expired");
      return res.status(410).json({ error: "Link expired" });
    }

    const referrer = req.get('Referrer') || 'direct';
    const location = req.get('X-Location') || 'unknown';

    urlDoc.clicks.push({ referrer, location });
    await urlDoc.save();

    await Log("backend", "info", "redirect", `Redirected to ${urlDoc.originalUrl}`);
    res.redirect(urlDoc.originalUrl);
  } catch (err) {
    await Log("backend", "error", "redirect", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllShortURLs = async (req, res) => {
  try {
    const urls = await Url.find({}, {
      _id: 0,
      shortcode: 1,
      originalUrl: 1,
      expiry: 1,
      createdAt: 1,
      clicks: 1
    });

    const response = urls.map(url => ({
      shortcode: url.shortcode,
      originalUrl: url.originalUrl,
      expiry: url.expiry,
      createdAt: url.createdAt,
      clickCount: url.clicks.length,
      clicks: url.clicks.map(click => ({
        timestamp: click.timestamp,
        referrer: click.referrer,
        location: click.location
      }))
    }));

    await Log("backend", "info", "getAllShortURLs", "Fetched all URLs successfully");

    res.status(200).json(response);
  } catch (err) {
    await Log("backend", "error", "getAllShortURLs", err.message);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};



export { createShortUrl, getStats, redirectToOriginal,getAllShortURLs };

