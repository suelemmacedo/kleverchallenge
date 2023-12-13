const express = require('express');
const router = express.Router();

// Post em /send:

router.post('/', (req, res) => {
  const { address, amount } = req.body;
  const selectedUtxos = selectUtxos(address, amount);

  const totalAmount = selectedUtxos.reduce((total, utxo) => total + utxo.amount, 0);
  const transactionFee = 10000; 
  const totalRequiredAmount = amount + transactionFee;

  if (totalAmount >= totalRequiredAmount) {
    res.json({
      utxos: selectedUtxos.map(({ txid, amount }) => ({ txid, amount: amount.toString() })),
    });
  } else {
    res.status(400).json({ error: 'Insufficient funds' });
  }
});

// Seleção de UTxos em address e amount

function selectUtxos(address, amount) {
  const utxos = [
    { txid: "9ec20061fc37196c2ca689c36b002b786d461ee054a0557793be1eba11163932", amount: 17880859 },
    { txid: "ee95bfb4a45c8e388447c2873893bc4c5aaee5083d0436017d3ae2bd6d0c38b9", amount: 729049 },
  ];

  return utxos.filter(utxo => utxo.amount >= amount);
}

// Get em /send/tx/:txId

router.get('/tx/:txID', (req, res) => {
  const { txID } = req.params;
  const transactionDetails = processTransaction(txID);

  if (transactionDetails) {
    res.json(transactionDetails);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});


// Transação conforme ID

function processTransaction(txID) {
  const transactionDetails = {
    addresses: [
      { address: "bc1qyzxdu4px4jy8gwhcj82zpv7qzhvc0fvumgnh0r", value: "10000000" },
    ],
    block: 675674,
    txID: "3654d26660dcc05d4cfb25a1641a1e61f06dfeb38ee2279bdb049d018f1830ab",
  };

  return transactionDetails;
}

module.exports = router;

