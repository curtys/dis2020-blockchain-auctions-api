pragma solidity >=0.6.7 <0.7.0;

contract Auction {

    struct Bid {
        uint timestamp;
        string bidder;
        uint bid;
    }

    address owner;
    string internal seller;
    string internal title;
    string internal description;
    bool internal active = true;
    Bid internal currentBid;

    constructor(string memory _seller, string memory _title, string memory _description) public {
        owner = msg.sender;
        seller = _seller;
        title = _title;
        description = _description;
    }

    function getInformation() public view returns (string memory, string memory,
        string memory, string memory, uint, bool) {
        return (seller, title, description, currentBid.bidder, currentBid.bid, active);
    }

    function bid(string memory bidder, uint bidAmount) public returns (bool accepted, string memory reason) {
        if (!active) return (false, "auction is not active");
        if (keccak256(bytes(seller)) == keccak256(bytes(bidder))) return (false, "seller cannot bid");
        if (bidAmount >= currentBid.bid) return (false, "not highest bid");
    }
}