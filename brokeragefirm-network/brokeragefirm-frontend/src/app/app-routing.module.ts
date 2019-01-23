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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { OpportunityWonComponent } from './OpportunityWon/OpportunityWon.component';

import { BrokerageFirmsComponent } from './BrokerageFirms/BrokerageFirms.component';
import { LicenseBrokersComponent } from './LicenseBrokers/LicenseBrokers.component';
import { EmployeersComponent } from './Employeers/Employeers.component';

import { CreateLeadComponent } from './CreateLead/CreateLead.component';
import { OpportunityComponent } from './Opportunity/Opportunity.component';
import { OpportunityWIPComponent } from './OpportunityWIP/OpportunityWIP.component';
import { WonComponent } from './Won/Won.component';
import { ClosureComponent } from './Closure/Closure.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'OpportunityWon', component: OpportunityWonComponent },
  { path: 'BrokerageFirms', component: BrokerageFirmsComponent },
  { path: 'LicenseBrokers', component: LicenseBrokersComponent },
  { path: 'Employeers', component: EmployeersComponent },
  { path: 'CreateLead', component: CreateLeadComponent },
  { path: 'Opportunity', component: OpportunityComponent },
  { path: 'OpportunityWIP', component: OpportunityWIPComponent },
  { path: 'Won', component: WonComponent },
  { path: 'Closure', component: ClosureComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
