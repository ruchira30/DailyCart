const axios = require('axios');
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let salt_key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
let merchant_id = 'PGTESTPAYUAT';

app.get('/', (req, res) => {
    res.send(salt_key);
});

app.post('/order', async (req, res) => {
    try {
        const { merchantTransactionId, name, amount, phone } = req.body;

        // Validate request body
        if (!merchantTransactionId || !name || !amount || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data1 = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            name: name,
            amount: amount * 100,
            redirectUrl: `http://192.168.183.66:8000/status?id=${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: phone,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        };

        const payload = JSON.stringify(data1);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        await axios(options).then(function (response) {
            console.log(response.data);
            return res.json(response.data);
        }).catch(function (error) {
            console.log('Error:', error.response ? error.response.data : error.message);
            return res.status(500).json({ error: 'An error occurred', details: error.response ? error.response.data : error.message });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred', details: error.message });
    }
});

const PORT = 8000; // Changed port
const HOST = '192.168.183.66';
app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});
