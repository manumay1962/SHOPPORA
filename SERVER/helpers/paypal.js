const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AbhNWtwkS6ZduBuDXafvMKGtifvsqxe2uWOBrxLHf66rvVZnlTzSQTJiKHJwxYEURToHnv3Cn3zdQFQs",
  client_secret: "EGZB2ajLtCsBC7J4AL5M7XJifDLIT2_girK-D4WNZ4f9k_jPUaHpC9_VhsaK2ZtpYkPgQEAyBIZpacgq",
});

module.exports = paypal;