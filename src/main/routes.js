const express = require('express');
const router = express.Router();
const Auction = require('../models/auction');

router.get('/ping', (req, res) => {
    res.sendStatus(200);
});

router.post('/auctions', async (req, res, next) => {
    // const result = await container(req).contractController.deploy();
    // if (result === true) res.sendStatus(204);
    // else res.sendStatus(500);
    const auction = req.body;
    console.log(auction);
    await container(req).auctionController.createAuction(auction);
    res.sendStatus(204);
});

router.get('/auctions/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
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

router.get('/auctions/user/:uname/owner', async (req, res, next) => {
    auctionsOfUser(req, res, 'owner');
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

module.exports = router;