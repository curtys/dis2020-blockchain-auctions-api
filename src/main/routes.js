const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
    res.sendStatus(200);
});

router.get('/hello', (req, res) => {
    res.send(container(req).contractController.world());
});

router.get('/create', async (req, res) => {
    const result = await container(req).contractController.deploy();
    if (result === true) res.sendStatus(204);
    else res.sendStatus(500);
});

function container(req) {
    return req.app.locals.container;
}

module.exports = router;