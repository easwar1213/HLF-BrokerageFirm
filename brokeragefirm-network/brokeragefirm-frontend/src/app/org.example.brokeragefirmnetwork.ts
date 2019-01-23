import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.brokeragefirmnetwork{
   export enum ParticipantStatus {
      ACTIVE,
      NON_ACTIVE,
   }
   export enum OppurtunityStatus {
      LEAD,
      OPPURTUNITY,
      OPPURTUNITY_WIP,
      OPPURTUNITY_WON,
      OPPURTUNITY_CLOSURE,
   }
   export class CommunicationDetails {
      address: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
      email: string;
      fax: string;
      contactNumber: string;
   }
   export class BrokerageFirms extends Participant {
      brokerageId: string;
      brokerageName: string;
      brokerageLicenseNo: string;
      brokerageCommunicationDetails: CommunicationDetails;
      brokerageStatus: ParticipantStatus;
   }
   export class LicenseBrokers extends BrokerageFirms {
      brokerId: string;
      brokerName: string;
      brokerLicenseNo: string;
      brokerCommunicationDetails: CommunicationDetails;
      brokerStatus: ParticipantStatus;
   }
   export class Employeers extends BrokerageFirms {
      employeerId: string;
      employeerName: string;
      employeerLicenseNo: string;
      employerCommunicationDetails: CommunicationDetails;
      employeerStatus: ParticipantStatus;
   }
   export class OpportunityWon extends Asset {
      opportunityId: string;
      brokerageId: BrokerageFirms;
      brokerageName: BrokerageFirms;
      description: string;
      brokerId: LicenseBrokers;
      brokerName: LicenseBrokers;
      employeerId: Employeers;
      employeerName: Employeers;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class CreateLead extends Transaction {
      opportunityId: string;
      brokerageId: BrokerageFirms;
      brokerageName: BrokerageFirms;
      description: string;
      brokerId: LicenseBrokers;
      brokerName: LicenseBrokers;
      employeerId: Employeers;
      employeerName: Employeers;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class LeadCreate extends Event {
      opportunityId: string;
      brokerageId: BrokerageFirms;
      brokerageName: BrokerageFirms;
      description: string;
      brokerId: LicenseBrokers;
      brokerName: LicenseBrokers;
      employeerId: Employeers;
      employeerName: Employeers;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class Opportunity extends Transaction {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class UpdateOpp extends Event {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class OpportunityWIP extends Transaction {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class UpdateOppWIP extends Event {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class Won extends Transaction {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class UpdateOppWon extends Event {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class Closure extends Transaction {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
   export class UpdateOppClosure extends Event {
      opportunityId: string;
      description: string;
      oppurtunityStatus: OppurtunityStatus;
   }
// }
