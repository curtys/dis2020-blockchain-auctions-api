const express = require('express');
const router = express.Router();
const Auction = require('../models/auction');

router.get('/ping', (req, res) => {
    res.sendStatus(200);
});

router.post('/auctions', async (req, res) => {
    const auction = req.body;
    console.log(auction);
    try {
        const id = await container(req).auctionController.createAuction(auction);
        res.send(id);
    } catch (error) {
        return handleError(error, res);
    }
});

router.get('/auctions/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    const auction = new Auction(id, 'jerry', 'auction1', 'blah');

    try {
        const result = await container(req).auctionController.getAuction(id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.send(result);

    } catch (error) {
        return handleError(error, res);
    }
});

router.post('/auctions/:id/bid', async (req, res) => {
    const id = req.params.id;
    const bid = req.body;
    if (!id || !bid || !bid.user || !bid.amount) {
        res.sendStatus(400);
        return;
    }
    const auction = new Auction(id, 'jerry', 'auction1', 'blah');
    const result = await container(req).auctionController.getAuction(id);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    console.log(result);
    res.send(result);
});

router.get('/auctions', async (req, res, next) => {
    const result = await container(req).auctionController.getAuctions();
    res.send(result);
});

router.get('/auctions/user/:uname/seller', async (req, res, next) => {
    auctionsOfUser(req, res, 'seller');
});

router.get('/auctions/user/:uname/bidder', async (req, res, next) => {
    auctionsOfUser(req, res, 'bidder');
});

async function auctionsOfUser(req, res, role) {
    const uname = req.params.uname;
    if (!uname) {
        res.sendStatus(400);
        return;
    }
    const result = await container(req).auctionController.getAuctionsOfUser(uname, role);
    res.send(result);
} 

function container(req) {
    return req.app.locals.container;
}

function handleError(error, res) {
    console.error(error.stack);
    res.sendStatus(500);
}

module.exports = router;