const express = require("express");
const router = express.Router();
const courierActivity = require("../controller/courier-Controller");

// OTP-API
router.post("/otp", function(request, response) {
  let otpdata = { mob: request.body.number };

  let ResMsg;
  if (otpdata != null) {
    courierActivity.courierDetails(otpdata, (err, row, fields) => {
      if (err) {
        response.json(err);
      } else {
        debugger;
        console.log(row);
        response.json(row);
      }
    });
  }
});

router.get("/test", (request, response) => {
  let a = courierActivity.test();
  response.json(a);
});
module.exports = router;
