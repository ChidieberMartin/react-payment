// controllers/paymentController.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config()


// Paystack
export const initializePaystack = async (req, res) => {
  const { email, amount } = req.body;
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        callback_url: "http://localhost:3000/payment-success",
      },
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );
    res.json(response.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPaystack = async (req, res) => {
  const { reference } = req.params;
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    res.json(response.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Flutterwave
export const initializeFlutterwave = async (req, res) => {
  const { email, amount, name } = req.body;
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: `tx-${Date.now()}`,
        amount,
        currency: "NGN",
        redirect_url: "http://localhost:3000/verify/flutterwave", // adjust to your frontend route
        customer: { email, name },
      },
      { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` } }
    );
    res.json(response.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyFlutterwave = async (req, res) => {
  const { transaction_id } = req.params;
  try {
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` },
    });
    res.json(response.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
