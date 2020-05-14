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
}