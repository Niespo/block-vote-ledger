/* global getAssetRegistry */
/* global getParticipantRegistry */
/* global getTransactionRegistry */
/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
'use strict';

/**
 * Registering a new voter
 * @param {com.hack4future.voting.RegisterVoter} agreement to register
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onRegisterVoter(transaction) {
    return getAssetRegistry('com.hack4future.voting.Voter')
        .then(function (registry) {
            console.log('Adding Voter', transaction);
            return registry.add({
                'name': transaction.name
            });
        });
};

/**
 * Registers a new Poll
 * @param {com.hack4future.voting.RegisterPoll} agreement to register
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onRegisterPoll(transaction) {
    return getAssetRegistry('com.hack4future.voting.Poll')
        .then(function (registry) {
            console.log('Adding Poll', transaction);
            return registry.add({
                activeStartTime: transaction.activeStartTime,
                activeEndTime: transaction.activeEndTime,
                name: transaction.name,
                description: transaction.description
            });
        });
};