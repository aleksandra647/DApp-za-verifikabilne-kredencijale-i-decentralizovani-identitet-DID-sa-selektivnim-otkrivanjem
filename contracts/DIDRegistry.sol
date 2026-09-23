// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DIDRegistry {
    address public owner;

    mapping(address => bool) public authorizedIssuers;
    mapping(bytes32 => bool) public revokedCredentials;

    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);
    event CredentialIssued(bytes32 indexed credentialHash, address indexed issuer);
    event CredentialRevoked(bytes32 indexed credentialHash, address indexed issuer);

    modifier onlyAdmin() {
        require(msg.sender == owner, "Samo admin moze izvrsiti ovu akciju");
        _;
    }

    modifier onlyIssuer() {
        require(authorizedIssuers[msg.sender], "Niste ovlasceni izdavalac");
        _;
    }
    function isIssuerAuthorized(address _issuer) external view returns (bool) {
        return authorizedIssuers[_issuer];
    }
    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
        emit IssuerAuthorized(msg.sender);
    }

    function authorizeIssuer(address _issuer) external onlyAdmin {
        authorizedIssuers[_issuer] = true;
        emit IssuerAuthorized(_issuer);
    }

    function revokeIssuer(address _issuer) external onlyAdmin {
        authorizedIssuers[_issuer] = false;
        emit IssuerRevoked(_issuer);
    }

    function registerCredential(bytes32 _credHash) external onlyIssuer {
        emit CredentialIssued(_credHash, msg.sender);
    }

    function revokeCredential(bytes32 _credHash) external onlyIssuer {
        revokedCredentials[_credHash] = true;
        emit CredentialRevoked(_credHash, msg.sender);
    }

    function isCredentialValid(bytes32 _credHash, address _issuer) external view returns (bool) {
        if (!authorizedIssuers[_issuer]) return false;
        if (revokedCredentials[_credHash]) return false;
        return true;
    }
}