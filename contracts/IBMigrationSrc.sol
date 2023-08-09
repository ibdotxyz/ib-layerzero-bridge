// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@layerzerolabs/solidity-examples/contracts/token/oft/IOFT.sol";

contract IBMigrationSrc is NonblockingLzApp {

    IERC20 immutable public oldIbToken;
    IOFT immutable public newIbToken;
    uint16 public destChainId = 111; // Optimism
    address public zroPaymentAddress = address(0);
    bytes public defaultAdapterParams = bytes("");

    constructor(IERC20 _oldIbToken, IOFT _newIbToken, address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {
        oldIbToken = _oldIbToken;
        newIbToken = _newIbToken;
    }

    function migrate(uint256 amount) public payable {
        require(newIbToken.balanceOf(address(this)) >= amount, "not enough new ibToken");
        IERC20(oldIbToken).transferFrom(msg.sender, address(this), amount);

        bytes memory toAddress = abi.encodePacked(msg.sender);
        newIbToken.sendFrom{value: msg.value}(address(this), destChainId, toAddress, amount, payable(msg.sender), zroPaymentAddress, defaultAdapterParams);
    }

    function migrate(uint256 amount, bytes calldata adapterParams) public payable {
        require(newIbToken.balanceOf(address(this)) >= amount, "not enough new ibToken");
        IERC20(oldIbToken).transferFrom(msg.sender, address(this), amount);

        bytes memory toAddress = abi.encodePacked(msg.sender);
        newIbToken.sendFrom{value: msg.value}(address(this), destChainId, toAddress, amount, payable(msg.sender), zroPaymentAddress, adapterParams);
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

    function setDefaultAdapterParams(bytes memory _defaultAdapterParams) onlyOwner external {
        defaultAdapterParams = _defaultAdapterParams;
    }

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64, /*_nonce*/
        bytes memory _payload
    ) internal override {}

}
