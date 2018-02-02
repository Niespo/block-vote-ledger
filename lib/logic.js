/* global getAssetRegistry */
/* global getParticipantRegistry */
/* global getTransactionRegistry */
/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
'use strict';

/**
 * Registering agreement
 * @param {lol.hyper.voting.RegisterNewAgreementTransaction} agreement to register
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onRegisterNewAgreement(transaction) {
    transaction = setLastModifyingParty(transaction);
    return getAssetRegistry('com.creditsuisse.hackathon.nda.NonDisclosureAgreement').then(function (registry) {
        console.log('NDA added', transaction.agreement);
        return registry.add(transaction.agreement);
    }
    );
}

/**
 * Editing agreement
 * @param {lol.hyper.voting.SignAgreementTransaction} agreement to edit
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onSignAgreement(transaction) {
    var agreement;
    var signature;
    return getAssetRegistry('com.creditsuisse.hackathon.nda.NonDisclosureAgreement')
        .then(function (agreementRegistry) {
            agreement = agreementRegistry.get(transaction.agreementID);
            return getParticipantRegistry('com.creditsuisse.hackathon.nda.Party');
        }.then(function (partyRegistry) {
            var signingParty = partyRegistry.get(transaction.partyID);
            agreement.lastModifiedBy = signingParty;
            signature = new Signature();
            signature.signingParty = signingParty;
            signature.signed = transaction.signed;
            signature.signatureId = Math.random().toString(16).slice(2);
            signature.signatureDate = new Date();
            return getAssetRegistry('com.creditsuisse.hackathon.nda.Signature').add(signature);
        }.then(function (result) {
            agreement.signatures.push(signature);
            return agreementRegistry.update(agreement);
        })));
}

function setLastModifyingParty(transaction) {
    if (transaction.party) {
        transaction.agreement.lastModifiedBy = transaction.party;
    }
    return transaction;
}