/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */
const brokerageNetwork = 'org.example.brokeragefirmnetwork';

/**
 * Create Lead transaction
 * @param {org.example.brokeragefirmnetwork.CreateLead} tx
 * @transaction
 */

async function createLead(tx) {
    // Create a new instance of Lead.
    const factory = getFactory();
    const lead = factory.newResource(brokerageNetwork, 'OpportunityWon', tx.opportunityId);
    lead.brokerageId = factory.newRelationship(brokerageNetwork, 'BrokerageFirms', tx.brokerageId);    
    lead.brokerageName = factory.newRelationship(brokerageNetwork, 'BrokerageFirms', tx.brokerageName);    
    lead.description=tx.description;
    lead.brokerId = factory.newRelationship(brokerageNetwork, 'LicenseBrokers', tx.brokerId);    
    lead.brokerName = factory.newRelationship(brokerageNetwork, 'LicenseBrokers', tx.brokerName);
    lead.employeerId = factory.newRelationship(brokerageNetwork, 'Employeers', tx.employeerId);    
    lead.employeerName = factory.newRelationship(brokerageNetwork, 'Employeers', tx.employeerName);
    lead.oppurtunityStatus = tx.oppurtunityStatus;
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.brokeragefirmnetwork.OpportunityWon');
    // Update the asset in the asset registry.
    await assetRegistry.add(lead);

    // Emit an event for the added lead.
    let event = getFactory().newEvent('org.example.brokeragefirmnetwork', 'LeadCreate');
    event.opportunityId = tx.opportunityId;
    event.brokerageId = tx.brokerageId;
    event.brokerageName = tx.brokerageName;
    event.description = tx.description;
    event.brokerId = tx.brokerId;
    event.brokerName = tx.brokerName;
    event.employeerId = tx.employeerId;
    event.employeerName = tx.employeerName;
    event.oppurtunityStatus = tx.oppurtunityStatus;
    emit(event);
}

// async function updateOpportunity(tx) {
//     // Create a new instance of Lead.
//     const factory = getFactory();
//     const opp;
//     opp.opportunityId=tx.opportunityId;
//     opp.oppurtunityStatus=tx.opportunityId;
//     opp.description=tx.description;
//     opp.oppurtunityStatus = tx.oppurtunityStatus;
//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('org.example.brokeragefirmnetwork.OpportunityWon');
//     // Update the asset in the asset registry.
//     await assetRegistry.update(opp);

//     // Emit an event for the added UpdateOpp.
//     let event = getFactory().newEvent('org.example.brokeragefirmnetwork', 'UpdateOpp');
//     event.opportunityId = tx.opportunityId;
//     event.description = tx.description;
//     event.oppurtunityStatus = tx.oppurtunityStatus;
//     emit(event);
// }
