const hre = require("hardhat");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GrantsRegistry", function () {
  before(async function() {
    [this.owner, this.grantRecipient, ...this.accounts] = await ethers.getSigners();

    const GrantsRegistry = await hre.ethers.getContractFactory("GrantsRegistry", this.owner);
    this.contract = await GrantsRegistry.deploy();
    await this.contract.deployed();
  });

  it("creates a new grants and adds it to the grants list", async function () {
    const testMetadata = "test-metadata";

    expect(await this.contract.grantsLength()).to.equal("0");
    await this.contract.createGrant(this.owner.address, testMetadata, this.grantRecipient.address);
    expect(await this.contract.grantsLength()).to.equal("1");

    const grant = await this.contract.grants(0);
    expect(grant.id).to.equal("0");
    expect(grant.recipient).to.equal(this.grantRecipient.address);
    expect(grant.owner).to.equal(this.owner.address);
    expect(grant.metadata).to.equal(testMetadata);
  });
});