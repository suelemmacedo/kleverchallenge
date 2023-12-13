const express = require('express');
const router = express.Router();

const data = {
  "bc1qyzxdu4px4jy8gwhcj82zpv7qzhvc0fvumgnh0r": {
    "address": "bc1qyzxdu4px4jy8gwhcj82zpv7qzhvc0fvumgnh0r",
    "balance": "144011754",
    "totalTx": 17000,
    "transactions": {
      "confirmed": "1321321",
      "unconfirmed": "123213"
    },
    "total": {
      "sent": "1189163719343",
      "received": "1189307731097"
    }
  }
};

router.get('/:address', (req, res) => {
  const { address } = req.params;
  const user = data[address];

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "Endereço não encontrado!" });
  }
});

module.exports = router;
