const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const { data } = req.body;
  res.status(200).send("입지출 내역이다. 알겠냐?");
});

module.exports = router;
