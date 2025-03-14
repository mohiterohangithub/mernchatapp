function pageNotFount(req, res, next) {
  res.status(400).json({ message: "Page Not Fount" });
}
module.exports = pageNotFount;
