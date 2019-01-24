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
import { CreateLeadService } from './CreateLead.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createlead',
  templateUrl: './CreateLead.component.html',
  styleUrls: ['./CreateLead.component.css'],
  providers: [CreateLeadService]
})
export class CreateLeadComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  opportunityId = new FormControl('', Validators.required);
  brokerageId = new FormControl('', Validators.required);
  brokerageName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  brokerId = new FormControl('', Validators.required);
  brokerName = new FormControl('', Validators.required);
  employeerId = new FormControl('', Validators.required);
  employeerName = new FormControl('', Validators.required);
  oppurtunityStatus = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceCreateLead: CreateLeadService, fb: FormBuilder) {
    this.myForm = fb.group({
      opportunityId: this.opportunityId,
      brokerageId: this.brokerageId,
      brokerageName: this.brokerageName,
      description: this.description,
      brokerId: this.brokerId,
      brokerName: this.brokerName,
      employeerId: this.employeerId,
      employeerName: this.employeerName,
      oppurtunityStatus: this.oppurtunityStatus,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreateLead.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.brokeragefirmnetwork.CreateLead',
      'opportunityId': this.opportunityId.value,
      'brokerageId': 'resource:org.example.brokeragefirmnetwork.BrokerageFirms#' +this.brokerageId.value,
      'brokerageName': 'resource:org.example.brokeragefirmnetwork.BrokerageFirms#' +this.brokerageName.value,
      'description': this.description.value,
      'brokerId': 'resource:org.example.brokeragefirmnetwork.LicenseBrokers#' +this.brokerId.value,
      'brokerName': 'resource:org.example.brokeragefirmnetwork.LicenseBrokers#' +this.brokerName.value,
      'employeerId': 'resource:org.example.brokeragefirmnetwork.Employeers#' +this.employeerId.value,
      'employeerName': 'resource:org.example.brokeragefirmnetwork.Employeers#' +this.employeerName.value,
      'oppurtunityStatus': this.oppurtunityStatus.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'opportunityId': null,
      'brokerageId': null,
      'brokerageName': null,
      'description': null,
      'brokerId': null,
      'brokerName': null,
      'employeerId': null,
      'employeerName': null,
      'oppurtunityStatus': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCreateLead.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'opportunityId': null,
        'brokerageId': null,
        'brokerageName': null,
        'description': null,
        'brokerId': null,
        'brokerName': null,
        'employeerId': null,
        'employeerName': null,
        'oppurtunityStatus': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.brokeragefirmnetwork.CreateLead',
      'opportunityId': this.opportunityId.value,
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'description': this.description.value,
      'brokerId': this.brokerId.value,
      'brokerName': this.brokerName.value,
      'employeerId': this.employeerId.value,
      'employeerName': this.employeerName.value,
      'oppurtunityStatus': this.oppurtunityStatus.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceCreateLead.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceCreateLead.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceCreateLead.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'opportunityId': null,
        'brokerageId': null,
        'brokerageName': null,
        'description': null,
        'brokerId': null,
        'brokerName': null,
        'employeerId': null,
        'employeerName': null,
        'oppurtunityStatus': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.opportunityId) {
        formObject.opportunityId = result.opportunityId;
      } else {
        formObject.opportunityId = null;
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

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

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

      if (result.oppurtunityStatus) {
        formObject.oppurtunityStatus = result.oppurtunityStatus;
      } else {
        formObject.oppurtunityStatus = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'opportunityId': null,
      'brokerageId': null,
      'brokerageName': null,
      'description': null,
      'brokerId': null,
      'brokerName': null,
      'employeerId': null,
      'employeerName': null,
      'oppurtunityStatus': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
