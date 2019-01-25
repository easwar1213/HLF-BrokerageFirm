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
import { BrokerageFirmsService } from '../BrokerageFirms/BrokerageFirms.service';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Component({
  selector: 'app-employeers',
  templateUrl: './Employeers.component.html',
  styleUrls: ['./Employeers.component.css'],
  providers: [EmployeersService,BrokerageFirmsService]
})
export class EmployeersComponent implements OnInit {

  myForm: FormGroup;
  user: any = {};
  enableCreateDel: boolean;

  private allParticipants;
  private participant;
  private brokerageFirms;
  private currentId;
  private errorMessage;

  employeerId = new FormControl('', Validators.required);
  employeerName = new FormControl('', Validators.required);
  employeerLicenseNo = new FormControl('', Validators.required);
  employerCommunicationDetails = new FormControl('', Validators.required);
  employeerStatus = new FormControl('', Validators.required);


  constructor(public serviceEmployeers: EmployeersService,public serviceBrokerageFirms: BrokerageFirmsService, fb: FormBuilder) {
    this.myForm = fb.group({
      employeerId: this.employeerId,
      employeerName: this.employeerName,
      employeerLicenseNo: this.employeerLicenseNo,
      employerCommunicationDetails: this.employerCommunicationDetails,
      employeerStatus: this.employeerStatus
    });
  };

  ngOnInit(): void {
    this.getUser();
    this.loadAll();
    if(this.user.type=="networkadmin"){
      this.getBrokerageFirms();
    }
    else{
      this.getCurrentBrokerageFirms();
    }    
  }

  getUser(): void {
    console.log("tempList", this.user)
    this.user = JSON.parse(localStorage.getItem('user'));
    this.enableCreateDel = true ? this.user.type == 'networkadmin' || this.user.type == 'brokeragefirms' : false;
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

  getBrokerageFirms(): Promise<any> {
    const tempList = [];
    return this.serviceBrokerageFirms.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });

      if (this.user.type == 'brokeragefirms'){
        this.serviceEmployeers.getparticipant(this.user.id)
        .toPromise().then((res) => {
          console.log(res);
          this.brokerageFirms = _.filter(tempList, tl => tl.brokerageId == res.brokerageId);
        })
      } else {
        this.brokerageFirms = tempList;
      }
      this.brokerageFirms = tempList;
      console.log("tempList", tempList)
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

  getCurrentBrokerageFirms(): Promise<any> {
    console.log("hai");
    return this.serviceBrokerageFirms.getparticipant(this.user.id)
    .toPromise()
    .then((result) => { 
      this.brokerageFirms = result;
      console.log("tempListCurr", result)
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
      'brokerageId': this.brokerageFirms.brokerageId,
      'brokerageName': this.brokerageFirms.brokerageName,
      'brokerageLicenseNo': this.brokerageFirms.brokerageLicenseNo,
      'brokerageCommunicationDetails': this.brokerageFirms.brokerageCommunicationDetails,
      'brokerageStatus': this.brokerageFirms.brokerageStatus
    };

    this.myForm.setValue({
      'employeerId': null,
      'employeerName': null,
      'employeerLicenseNo': null,
      'employerCommunicationDetails': null,
      'employeerStatus': null
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
        'employeerStatus': null        
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
      'brokerageId': this.brokerageFirms.brokerageId,
      'brokerageName': this.brokerageFirms.brokerageName,
      'brokerageLicenseNo': this.brokerageFirms.brokerageLicenseNo,
      'brokerageCommunicationDetails': this.brokerageFirms.brokerageCommunicationDetails,
      'brokerageStatus': this.brokerageFirms.brokerageStatus  
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
        'employeerStatus': null        
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
      'employeerStatus': null      
    });
  }
}
