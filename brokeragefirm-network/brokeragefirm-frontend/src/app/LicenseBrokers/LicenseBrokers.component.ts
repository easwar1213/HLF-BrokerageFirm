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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LicenseBrokersService } from './LicenseBrokers.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-licensebrokers',
  templateUrl: './LicenseBrokers.component.html',
  styleUrls: ['./LicenseBrokers.component.css'],
  providers: [LicenseBrokersService]
})
export class LicenseBrokersComponent implements OnInit {

  myForm: FormGroup;
  user: any = {};
  enableCreateDel: boolean;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  brokerId = new FormControl('', Validators.required);
  brokerName = new FormControl('', Validators.required);
  brokerLicenseNo = new FormControl('', Validators.required);
  brokerCommunicationDetails = new FormControl('', Validators.required);
  brokerStatus = new FormControl('', Validators.required);
  brokerageId = new FormControl('', Validators.required);
  brokerageName = new FormControl('', Validators.required);
  brokerageLicenseNo = new FormControl('', Validators.required);
  brokerageCommunicationDetails = new FormControl('', Validators.required);
  brokerageStatus = new FormControl('', Validators.required);


  constructor(public serviceLicenseBrokers: LicenseBrokersService, fb: FormBuilder) {
    this.myForm = fb.group({
      brokerId: this.brokerId,
      brokerName: this.brokerName,
      brokerLicenseNo: this.brokerLicenseNo,
      brokerCommunicationDetails: this.brokerCommunicationDetails,
      brokerStatus: this.brokerStatus,
      brokerageId: this.brokerageId,
      brokerageName: this.brokerageName,
      brokerageLicenseNo: this.brokerageLicenseNo,
      brokerageCommunicationDetails: this.brokerageCommunicationDetails,
      brokerageStatus: this.brokerageStatus
    });
  };

  ngOnInit(): void {
    this.getUser();
    this.loadAll();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.enableCreateDel = true ? this.user.type == 'networkadmin' || this.user.type == 'brokeragefirms' : false;
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLicenseBrokers.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.brokeragefirmnetwork.LicenseBrokers',
      'brokerId': this.brokerId.value,
      'brokerName': this.brokerName.value,
      'brokerLicenseNo': this.brokerLicenseNo.value,
      'brokerCommunicationDetails': this.brokerCommunicationDetails.value,
      'brokerStatus': this.brokerStatus.value,
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'brokerageLicenseNo': this.brokerageLicenseNo.value,
      'brokerageCommunicationDetails': this.brokerageCommunicationDetails.value,
      'brokerageStatus': this.brokerageStatus.value
    };

    this.myForm.setValue({
      'brokerId': null,
      'brokerName': null,
      'brokerLicenseNo': null,
      'brokerCommunicationDetails': null,
      'brokerStatus': null,
      'brokerageId': null,
      'brokerageName': null,
      'brokerageLicenseNo': null,
      'brokerageCommunicationDetails': null,
      'brokerageStatus': null
    });

    return this.serviceLicenseBrokers.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'brokerId': null,
        'brokerName': null,
        'brokerLicenseNo': null,
        'brokerCommunicationDetails': null,
        'brokerStatus': null,
        'brokerageId': null,
        'brokerageName': null,
        'brokerageLicenseNo': null,
        'brokerageCommunicationDetails': null,
        'brokerageStatus': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.example.brokeragefirmnetwork.LicenseBrokers',
      'brokerName': this.brokerName.value,
      'brokerLicenseNo': this.brokerLicenseNo.value,
      'brokerCommunicationDetails': this.brokerCommunicationDetails.value,
      'brokerStatus': this.brokerStatus.value,
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'brokerageLicenseNo': this.brokerageLicenseNo.value,
      'brokerageCommunicationDetails': this.brokerageCommunicationDetails.value,
      'brokerageStatus': this.brokerageStatus.value
    };

    return this.serviceLicenseBrokers.updateParticipant(form.get('brokerId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceLicenseBrokers.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceLicenseBrokers.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'brokerId': null,
        'brokerName': null,
        'brokerLicenseNo': null,
        'brokerCommunicationDetails': null,
        'brokerStatus': null,
        'brokerageId': null,
        'brokerageName': null,
        'brokerageLicenseNo': null,
        'brokerageCommunicationDetails': null,
        'brokerageStatus': null
      };

      if (result.brokerId) {
        formObject.brokerId = result.brokerId;
      } else {
        formObject.brokerId = null;
      }

      if (result.brokerName) {
        formObject.brokerName = result.brokerName;
      } else {
        formObject.brokerName = null;
      }

      if (result.brokerLicenseNo) {
        formObject.brokerLicenseNo = result.brokerLicenseNo;
      } else {
        formObject.brokerLicenseNo = null;
      }

      if (result.brokerCommunicationDetails) {
        formObject.brokerCommunicationDetails = result.brokerCommunicationDetails;
      } else {
        formObject.brokerCommunicationDetails = null;
      }

      if (result.brokerStatus) {
        formObject.brokerStatus = result.brokerStatus;
      } else {
        formObject.brokerStatus = null;
      }

      if (result.brokerageId) {
        formObject.brokerageId = result.brokerageId;
      } else {
        formObject.brokerageId = null;
      }

      if (result.brokerageName) {
        formObject.brokerageName = result.brokerageName;
      } else {
        formObject.brokerageName = null;
      }

      if (result.brokerageLicenseNo) {
        formObject.brokerageLicenseNo = result.brokerageLicenseNo;
      } else {
        formObject.brokerageLicenseNo = null;
      }

      if (result.brokerageCommunicationDetails) {
        formObject.brokerageCommunicationDetails = result.brokerageCommunicationDetails;
      } else {
        formObject.brokerageCommunicationDetails = null;
      }

      if (result.brokerageStatus) {
        formObject.brokerageStatus = result.brokerageStatus;
      } else {
        formObject.brokerageStatus = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'brokerId': null,
      'brokerName': null,
      'brokerLicenseNo': null,
      'brokerCommunicationDetails': null,
      'brokerStatus': null,
      'brokerageId': null,
      'brokerageName': null,
      'brokerageLicenseNo': null,
      'brokerageCommunicationDetails': null,
      'brokerageStatus': null
    });
  }
}
