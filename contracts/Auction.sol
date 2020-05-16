pragma solidity >=0.6.7 <0.7.0;

contract owned {
    constructor() public { owner = msg.sender; }
    address payable owner;

    modifier restricted {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}


contract Auction is owned {

    struct Bid {
        string bidder;
        uint64 amount;
        bool accepted;
    }

    string internal seller;
    string internal title;
    string internal description;
    Bid internal currentBid;
    bool internal closed = false;
    uint endTime;

    uint internal numBids = 0;
    mapping (uint => Bid) bids;

    event BidReceived(string bidder, uint64 amount, bool accepted, uint bidId);
    event AuctionClosed(string winner, uint64 amount);

    constructor(string memory _seller, string memory _title, string memory _description, uint _duration) public {
        seller = _seller;
        title = _title;
        description = _description;
        endTime = now + _duration;
    }

    function getInformation() public view returns (string memory, string memory,
        string memory, string memory, uint, uint, bool) {
        return (seller, title, description, currentBid.bidder, currentBid.amount, endTime, closed);
    }

    function bid(string memory bidder, uint64 amount) public {
        require(updateState(), "auction is closed");
        require(
            (keccak256(bytes(seller)) != keccak256(bytes(bidder))),
            "seller cannot bid"
        );

        uint bidId = numBids++;
        bool accepted = (amount >= currentBid.amount);

        Bid memory newBid = Bid(bidder, amount, accepted);
        bids[bidId] = newBid;

        if (accepted) currentBid = newBid;
        emit BidReceived(bidder, amount, accepted, bidId);
    }

    function updateState() public returns (bool) {
        if (closed) return false;
        if (now > endTime) {
            close();
            return false;
        }
        return !closed && now <= endTime;
    }

    function setClosed(bool a) external restricted { closed = a; }

    function close() public restricted {
        closed = true;
        emit AuctionClosed(currentBid.bidder, currentBid.amount);
    }
}