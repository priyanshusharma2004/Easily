export function trackLastVisit(req, res, next) {
  const now = new Date().toISOString();
  if (!req.cookies.lastVisit) {
    res.cookie('lastVisit', now, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  } else {
    res.cookie('lastVisit', now, { maxAge: 1000 * 60 * 60 * 24 * 365 });
  }
  next();
}
