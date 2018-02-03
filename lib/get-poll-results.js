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
 * @param {lol.hyper.voting.GetPollResults} poll to return
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onGetPollResults(transaction) {
    return getAssetRegistry('lol.hyper.voting.Ballot').then(function (registry) {
        return registry.getAll();
    }.then(function(result){
        var ballots = _.find(result, function(ballot) { return ballot.poll.id === transaction.pollID; })
        
    })
    );
}