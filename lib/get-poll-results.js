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
    var ballots;
    var poll;
    return getAssetRegistry('com.hack4future.votingBallot').then(function (registry) {
        return registry.getAll();
    }.then(function(result){
        ballots = _.find(result, function(ballot) { return ballot.poll.id === transaction.pollID; })
    }.then(function(result){
        
    }))
    );
    
}