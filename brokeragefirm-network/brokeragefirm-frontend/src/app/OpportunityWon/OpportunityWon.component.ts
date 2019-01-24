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
import { OpportunityWonService } from './OpportunityWon.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-opportunitywon',
  templateUrl: './OpportunityWon.component.html',
  styleUrls: ['./OpportunityWon.component.css'],
  providers: [OpportunityWonService]
})
export class OpportunityWonComponent implements OnInit {

  myForm: FormGroup;
  user: any = {};
  enableCreateDel: boolean;

  private allAssets;
  private asset;
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

  constructor(public serviceOpportunityWon: OpportunityWonService, fb: FormBuilder) {
    this.myForm = fb.group({
      opportunityId: this.opportunityId,
      brokerageId: this.brokerageId,
      brokerageName: this.brokerageName,
      description: this.description,
      brokerId: this.brokerId,
      brokerName: this.brokerName,
      employeerId: this.employeerId,
      employeerName: this.employeerName,
      oppurtunityStatus: this.oppurtunityStatus
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
    return this.serviceOpportunityWon.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.brokeragefirmnetwork.OpportunityWon',
      'opportunityId': this.opportunityId.value,
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'description': this.description.value,
      'brokerId': this.brokerId.value,
      'brokerName': this.brokerName.value,
      'employeerId': this.employeerId.value,
      'employeerName': this.employeerName.value,
      'oppurtunityStatus': this.oppurtunityStatus.value
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
      'oppurtunityStatus': null
    });

    return this.serviceOpportunityWon.addAsset(this.asset)
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
        'oppurtunityStatus': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.brokeragefirmnetwork.OpportunityWon',
      'brokerageId': this.brokerageId.value,
      'brokerageName': this.brokerageName.value,
      'description': this.description.value,
      'brokerId': this.brokerId.value,
      'brokerName': this.brokerName.value,
      'employeerId': this.employeerId.value,
      'employeerName': this.employeerName.value,
      'oppurtunityStatus': this.oppurtunityStatus.value
    };

    return this.serviceOpportunityWon.updateAsset(form.get('opportunityId').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceOpportunityWon.deleteAsset(this.currentId)
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

    return this.serviceOpportunityWon.getAsset(id)
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
        'oppurtunityStatus': null
      };

      if (result.opportunityId) {
        formObject.opportunityId = result.opportunityId;
      } else {
        formObject.opportunityId = null;
      }

      if (result.brokerageId) {
        formObject.brokerageId = String(result.brokerageId).split('#')[1];
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
      'oppurtunityStatus': null
      });
  }

}
