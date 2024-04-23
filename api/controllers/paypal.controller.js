const paypal = require("paypal-rest-sdk");
const { db } = require("../db/firebaseDb.js");

const SERVER_URL = "http://localhost:3000";

const pay = (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${SERVER_URL}/api/paypal/success`,
      cancel_url: `${SERVER_URL}/api/paypal/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.send(payment.links[i].href);
        }
      }
    }
  });
};

const success = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        db.collection("paymentHistory")
          .add(payment)
          .then((docRef) => {
            res.redirect("http://localhost:5173/success");
          })
          .catch((error) => {
            next(error);
          });
      }
    }
  );
};

const cancel = (req, res) => {
  res.redirect("http://localhost:5173/cancelled");
};

module.exports = { pay, success, cancel };
