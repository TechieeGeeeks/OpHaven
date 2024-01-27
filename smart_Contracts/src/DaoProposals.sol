// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract DAOProposal {
    using SafeERC20 for IERC20;

    address public dao; // Address of the DAO contract
    address public daoToken; // Address of the voting token contract
    uint256 public proposalIdCounter = 1;
    uint256 public votesRequired;
    uint256 public votingEndTime;
    uint256 public totalLockedTokens;
    mapping(address => uint256) public votes; // Mapping of voter addresses to their votes
    mapping(address => bool) public hasVoted; // Mapping to track if a voter has already voted
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public successFullProposal;
    address[] public voters; // Dynamic array to store voter addresses

    enum ProposalStatus {
        Pending,
        Approved,
        Rejected
    }
    ProposalStatus public status;

    struct Proposal {
        uint256 id;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 votesFor;
        uint256 votesAgainst;
        ProposalStatus status;
        address proposer;
    }

    modifier onlyVotingTokenHolder() {
        require(
            IERC20(daoToken).balanceOf(msg.sender) > 0,
            "Not a voting token holder"
        );
        _;
    }

    modifier onlyAfterVotingEnd() {
        require(block.timestamp >= votingEndTime, "Voting has not ended yet");
        _;
    }

    modifier onlyDAO() {
        // Ensure that only the DAO contract can execute certain functions
        require(msg.sender == dao, "Caller is not the DAO contract");
        _;
    }

    event VoteCasted(address indexed voter, uint256 votes);
    event ProposalApproved(uint256 proposalId);
    event ProposalRejected(uint256 proposalId);
    event TokensLocked(address indexed voter, uint256 amount);
    event TokensReleased(address indexed voter, uint256 amount);
    event ProposalCreated(
        uint256 proposalId,
        string description,
        uint256 startTime,
        uint256 endTime,
        address proposer
    );

constructor(
        address dao_,
        address daoToken_
    ) {
        dao = dao_;
        daoToken = daoToken_;
    }

    function castVote(uint256 proposalId, uint256 userVotes)
        external
        onlyVotingTokenHolder
        
    {
        // Ensure that the voter has not voted before
        require(!hasVoted[msg.sender], "Already voted");

        // Ensure that the voter has enough voting tokens to cast the votes
        require(
            IERC20(daoToken).balanceOf(msg.sender) >= userVotes,
            "Insufficient voting tokens"
        );

        // Update the votes for the voter
        votes[msg.sender] = userVotes;

        // Mark the voter as having voted
        hasVoted[msg.sender] = true;

        // Lock the voter's tokens
        totalLockedTokens += userVotes;
        IERC20(daoToken).safeTransferFrom(msg.sender, address(this), userVotes);

        // Update the votes for the proposal
        proposals[proposalId].votesFor += userVotes;

        // Add voter to the array if not already present
        if (!isVoter(msg.sender)) {
            voters.push(msg.sender);
        }

        emit VoteCasted(msg.sender, userVotes);
        emit TokensLocked(msg.sender, userVotes);
    }

    function isVoter(address voter) internal view returns (bool) {
        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i] == voter) {
                return true;
            }
        }
        return false;
    }

    function makeProposal(string memory description, uint256 duration)
        external
    {
        // Ensure that the caller has not created a proposal before
        require(
            proposals[proposalIdCounter].id == 0,
            "Already made a proposal"
        );

        uint256 proposalStartTime = block.timestamp;
        uint256 proposalEndTime = proposalStartTime + duration;

        // Create a new proposal
        proposals[proposalIdCounter] = Proposal({
            id: proposalIdCounter,
            description: description,
            startTime: proposalStartTime,
            endTime: proposalEndTime,
            votesFor: 0,
            votesAgainst: 0,
            status: ProposalStatus.Pending,
            proposer: msg.sender
        });

        // Emit event for the created proposal
        emit ProposalCreated(
            proposalIdCounter,
            description,
            proposalStartTime,
            proposalEndTime,
            msg.sender
        );

        // Increment the proposal ID counter
        proposalIdCounter++;
    }

    function executeProposal(uint256 proposalId)
        external
        onlyAfterVotingEnd
    {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.id != 0, "Proposal does not exist");

        require(
            proposal.status == ProposalStatus.Pending,
            "Proposal has already been executed"
        );

        uint256 totalVotesFor = proposal.votesFor;
        uint256 totalVotesAgainst = proposal.votesAgainst;
        uint256 totalVotes = totalVotesFor + totalVotesAgainst;

        successFullProposal[proposal.proposer] = 1000;
        
        if (totalVotes >= votesRequired) {
            // Proposal approved
            proposal.status = ProposalStatus.Approved;
            emit ProposalApproved(proposalId);

            // Add the proposal's proposer to the successful proposals mapping
            successFullProposal[proposal.proposer] = proposalId;
        } else {
            // Proposal rejected
            proposal.status = ProposalStatus.Rejected;
            emit ProposalRejected(proposalId);
        }

        // Release locked tokens to voters
        releaseLockedTokens(proposalId);
    }

    function releaseLockedTokens(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];

        // Release locked tokens to voters if the proposal is either approved or rejected
        for (uint256 i = 0; i < proposalIdCounter; i++) {
            address voter = voters[i];
            uint256 lockedTokens = DAOProposal(dao).votes(voter);

            // Release tokens only if the voter has voted for the proposal and their tokens are locked
            if (hasVoted[voter] && lockedTokens > 0) {
                totalLockedTokens -= lockedTokens;
                IERC20(daoToken).safeTransfer(voter, lockedTokens);

                emit TokensReleased(voter, lockedTokens);
            }
        }
    }

}
