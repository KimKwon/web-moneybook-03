const { Router } = require("express");
const { getAccountHistory } = require("../controllers/account-history");
const router = Router();

router.get("/", getAccountHistory);

module.exports = router;
