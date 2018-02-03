var _ = require('lodash');

/* global getAssetRegistry */
/* global getFactory */
/* global getParticipantRegistry */
/* global getTransactionRegistry */
/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
'use strict';

/**
 * Getting poll results
 * @param {com.hack4future.voting.GetPollResults} poll to return
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onGetPollResults(transaction) {
    console.log('Getting poll results', transaction.pollID);
    var ballots;
    var answers;
    var poll;
    var questions;
    var optputQuestions = {};
    return getAssetRegistry('com.hack4future.voting.Ballot')
        .then(function (ballotRegistry) {
            return ballotRegistry.getAll()
        })
        .then(function (ba) {
            ballots = _.find(ba, function (ballot) { return ballot.poll.id === transaction.pollID; });
            return ballots;
        });
}

/**
 * Getting polls
 * @param {com.hack4future.voting.GetMyPolls} polls to return
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onGetMyPolls(transaction) {
    console.log('Getting polls', transaction.pollID);
    var ballots;
    var answers;
    var poll;
    var questions;
    var optputQuestions = {};
    return getAssetRegistry('com.hack4future.voting.Poll')
        .then(function (pollRegistry) {
            return pollRegistry.getAll()
        });
}