// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@layerzerolabs/solidity-examples/contracts/token/oft/OFT.sol";

contract IBOFT is OFT {

    IERC20 immutable public oldIbToken;
    uint16 public destChainId = 111; // Optimism
    address public zroPaymentAddress = address(0);
    bytes public defaultAdapterParams = bytes("");

    constructor(IERC20 _oldIbToken, address _lzEndpoint) OFT("IronBank", "IB", _lzEndpoint) {
        oldIbToken = _oldIbToken;
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

    function migrate(uint256 amount) public payable {
        require(balanceOf(address(this)) >= amount, "not enough new ibToken");
        IERC20(oldIbToken).transferFrom(msg.sender, owner(), amount);
        _transfer(address(this), msg.sender, amount);

        bytes memory toAddress = abi.encodePacked(msg.sender);
        _send(msg.sender, destChainId, toAddress, amount, payable(msg.sender), zroPaymentAddress, defaultAdapterParams);
    }

    function migrateWithAdapter(uint256 amount, bytes calldata adapterParams) public payable {
        require(balanceOf(address(this)) >= amount, "not enough new ibToken");
        IERC20(oldIbToken).transferFrom(msg.sender, owner(), amount);
        _transfer(address(this), msg.sender, amount);

        bytes memory toAddress = abi.encodePacked(msg.sender);
        _send(msg.sender, destChainId, toAddress, amount, payable(msg.sender), zroPaymentAddress, adapterParams);
    }

    function seize(address token, uint256 amount) onlyOwner external {
        IERC20(token).transfer(owner(), amount);
    }

    function setDestChainId(uint16 _destChainId) onlyOwner external {
        destChainId = _destChainId;
    }

    function setZroPaymentAddress(address _zroPaymentAddress) onlyOwner external {
        zroPaymentAddress = _zroPaymentAddress;
    }

    function setDefaultAdapterParams(bytes calldata _defaultAdapterParams) onlyOwner external {
        defaultAdapterParams = _defaultAdapterParams;
    }
}
