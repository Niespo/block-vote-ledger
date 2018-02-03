/* global getAssetRegistry */
/* global getParticipantRegistry */
/* global getTransactionRegistry */
/* global getFactory */
/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/

'use strict';

var uuidv4 = require('uuid/v4');

var factory = getFactory();

var PACKAGE = 'com.hack4future.voting';

function getVoterRegistry() {
    return getAssetRegistry(PACKAGE + '.Voter');
}
function getPollRegistry() {
    return getAssetRegistry('com.hack4future.voting.Poll');
}
function getBallotRegistry() {
    return getAssetRegistry('com.hack4future.voting.Ballot');
}

/**
 * Registering a new voter.
 * 
 * @param {com.hack4future.voting.RegisterVoter} agreement to register
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onRegisterVoter(transaction) {
    return getVoterRegistry()
        .then(function (registry) {
            console.log('Adding Voter', transaction);

            var voter = factory.newResource(PACKAGE, 'Voter', uuidv4());
            voter.name = transaction.name;

            return registry.add(voter);
        });
}

/**
 * Registers a new Poll.
 * 
 * @param {com.hack4future.voting.RegisterPoll} agreement to register
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onRegisterPoll(transaction) {
    return getPollRegistry()
        .then(function (registry) {
            console.log('Adding Poll', transaction);

            var poll = factory.newResource(PACKAGE, 'Poll', uuidv4());
            poll.activeStartTime = transaction.activeStartTime;
            poll.activeEndTime = transaction.activeEndTime;
            poll.name = transaction.name;
            poll.description = transaction.description;

            return registry.add(poll);
        });
}

/**
 * Sends a Ballot
 * @param {com.hack4future.voting.SendBallot} agreement to register
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onSendBallot(tx) {
    var ballot = factory.newResource(PACKAGE, 'Ballot', uuidv4());
    ballot.commited = new Date();

    return getVoterRegistry()
        .then(function (voterRegistry) {
            ballot.voter = voterRegistry.get(tx.voterID);

            return getPollRegistry();
        })
        .then(function (pollRegistry) {
            ballot.poll = pollRegistry.get(tx.pollID);

            return getBallotRegistry();
        })
        .then(function (ballotRegistry) {
            ballot.add(ballot);
        });
}