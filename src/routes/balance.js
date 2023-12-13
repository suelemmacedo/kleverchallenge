const express = require('express');
const router = express.Router();

router.get('/:address', (req, res) => {
  const { address } = req.params;

  const utxos = [
    { address: "bc1qyzxdu4px4jy8gwhcj82zpv7qzhvc0fvumgnh0r", value: 500, confirmations: 2 },
    { address: "bc1qyzxdu4px4jy8gwhcj82zpv7qzhvc0fvumgnh0r", value: 200, confirmations: 0 },
  ];

  const balance = {
    confirmed: 0,
    unconfirmed: 0,
  };

  utxos.forEach(utxo => {
    if (utxo.confirmations < 2 && utxo.address === address) {
      balance.unconfirmed += utxo.value;
    } else if (utxo.address === address) {
      balance.confirmed += utxo.value;
    }
  });

  res.json(balance);
});

module.exports = router;