/* global getAssetRegistry */
/* global getParticipantRegistry */
/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
'use strict';

/**
 * Registering agreement
 * @param {com.creditsuisse.hackathon.nda.RegisterNewAgreementTransaction} agreement to register
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
 * @param {com.creditsuisse.hackathon.nda.SignAgreementTransaction} agreement to edit
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

/**
 * Editing agreement
 * @param {com.creditsuisse.hackathon.nda.EditAgreementTransaction} agreement to edit
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onEditAgreement(transaction) {
    transaction = setLastModifyingParty(transaction);
    return getAssetRegistry('com.creditsuisse.hackathon.nda.NonDisclosureAgreement').then(function (registry) {
        console.log('updating NDA', transaction.agreement);
        return registry.update(transaction.agreement);
    }
    );
}

/**
 * Setting up blockchain
 * @param {com.creditsuisse.hackathon.nda.SetupBlockchainTransaction} setting
 * @return {Promise} Asset Registry Promise
 * @transaction
 */
function onSetupBlockchain(setting) {
    console.log('Set up blockchain');
}

function setLastModifyingParty(transaction) {
    if (transaction.party) {
        transaction.agreement.lastModifiedBy = transaction.party;
    }
    return transaction;
}