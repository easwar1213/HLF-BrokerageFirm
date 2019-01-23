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
import { EmployeersService } from './Employeers.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-employeers',
  templateUrl: './Employeers.component.html',
  styleUrls: ['./Employeers.component.css'],
  providers: [EmployeersService]
})
export class EmployeersComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  employeerId = new FormControl('', Validators.required);
  employeerName = new FormControl('', Validators.required);
  employeerLicenseNo = new FormControl('', Validators.required);
  employerCommunicationDetails = new FormControl('', Validators.required);
  employeerStatus = new FormControl('', Validators.required);
  brokerageId = new FormControl('', Validators.required);
  brokerageName = new FormControl('', Validators.required);
  brokerageLicenseNo = new FormControl('', Validators.required);
  brokerageCommunicationDetails = new FormControl('', Validators.required);
  brokerageStatus = new FormControl('', Validators.required);


  constructor(public serviceEmployeers: EmployeersService, fb: FormBuilder) {
    this.myForm = fb.group({
      employeerId: this.employeerId,
      employeerName: this.employeerName,
      employeerLicenseNo: this.employeerLicenseNo,
      employerCommunicationDetails: this.employerCommunicationDetails,
      employeerStatus: this.employeerStatus,
      brokerageId: this.brokerageId,
      brokerageName: this.brokerageName,
      brokerageLicenseNo: this.brokerageLicenseNo,
      brokerageCommunicationDetails: this.brokerageCommunicationDetails,
      brokerageStatus: this.brokerageStatus
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEmployeers.getAll()
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
      $class: 'org.example.brokeragefirmnetwork.Employeers',
      'employeerId': this.employeerId.value,
      'employeerName': this.employeerName.value,
      'employeerLicenseNo': this.employeerLicenseNo.value,
      'employerCommunicationDetails': this.employerCommunicationDetails.value,
      'employeerStatus': this.employeerStatus.value,
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'brokerageLicenseNo': this.brokerageLicenseNo.value,
      'brokerageCommunicationDetails': this.brokerageCommunicationDetails.value,
      'brokerageStatus': this.brokerageStatus.value
    };

    this.myForm.setValue({
      'employeerId': null,
      'employeerName': null,
      'employeerLicenseNo': null,
      'employerCommunicationDetails': null,
      'employeerStatus': null,
      'brokerageId': null,
      'brokerageName': null,
      'brokerageLicenseNo': null,
      'brokerageCommunicationDetails': null,
      'brokerageStatus': null
    });

    return this.serviceEmployeers.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'employeerId': null,
        'employeerName': null,
        'employeerLicenseNo': null,
        'employerCommunicationDetails': null,
        'employeerStatus': null,
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
      $class: 'org.example.brokeragefirmnetwork.Employeers',
      'employeerName': this.employeerName.value,
      'employeerLicenseNo': this.employeerLicenseNo.value,
      'employerCommunicationDetails': this.employerCommunicationDetails.value,
      'employeerStatus': this.employeerStatus.value,
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'brokerageLicenseNo': this.brokerageLicenseNo.value,
      'brokerageCommunicationDetails': this.brokerageCommunicationDetails.value,
      'brokerageStatus': this.brokerageStatus.value
    };

    return this.serviceEmployeers.updateParticipant(form.get('employeerId').value, this.participant)
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

    return this.serviceEmployeers.deleteParticipant(this.currentId)
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

    return this.serviceEmployeers.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'employeerId': null,
        'employeerName': null,
        'employeerLicenseNo': null,
        'employerCommunicationDetails': null,
        'employeerStatus': null,
        'brokerageId': null,
        'brokerageName': null,
        'brokerageLicenseNo': null,
        'brokerageCommunicationDetails': null,
        'brokerageStatus': null
      };

      if (result.employeerId) {
        formObject.employeerId = result.employeerId;
      } else {
        formObject.employeerId = null;
      }

      if (result.employeerName) {
        formObject.employeerName = result.employeerName;
      } else {
        formObject.employeerName = null;
      }

      if (result.employeerLicenseNo) {
        formObject.employeerLicenseNo = result.employeerLicenseNo;
      } else {
        formObject.employeerLicenseNo = null;
      }

      if (result.employerCommunicationDetails) {
        formObject.employerCommunicationDetails = result.employerCommunicationDetails;
      } else {
        formObject.employerCommunicationDetails = null;
      }

      if (result.employeerStatus) {
        formObject.employeerStatus = result.employeerStatus;
      } else {
        formObject.employeerStatus = null;
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
      'employeerId': null,
      'employeerName': null,
      'employeerLicenseNo': null,
      'employerCommunicationDetails': null,
      'employeerStatus': null,
      'brokerageId': null,
      'brokerageName': null,
      'brokerageLicenseNo': null,
      'brokerageCommunicationDetails': null,
      'brokerageStatus': null
    });
  }
}
