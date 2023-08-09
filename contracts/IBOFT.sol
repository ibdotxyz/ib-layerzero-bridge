// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/OFT.sol";

contract IBOFT is OFT {
    constructor(address _lzEndpoint) OFT("IronBank", "IB", _lzEndpoint) {}

    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
