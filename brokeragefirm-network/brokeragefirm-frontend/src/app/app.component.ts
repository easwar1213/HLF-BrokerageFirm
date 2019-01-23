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

import { Component, AfterViewInit } from '@angular/core';
import { DataService } from './data.service';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app works!';
  user: any = {};

  ngAfterViewInit() {
    $('.nav a').on('click', function(){
      $('.nav').find('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function(){
      $(this).parent().parent().addClass('active');
    });
  }
  
  constructor(private dataService: DataService<any>) {
    console.log('Hello login User')
    this.getUser();
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  getUser() {
    let data: any = {};
    let user: any = {};
    let userType;
    let companyName;

    this.dataService.getSystemUser('ping').subscribe(result => {
      data = result;
      console.log("data: ", data)
      let identity = data.identity.split('.').pop(-1).split('#');
      let participant = data.participant.split('.').pop(-1).split('#');

      user['id'] = participant[1];
      user['type'] = participant[0].toLowerCase();
      user['identity'] = identity[1];
      userType = participant[0];

      if (userType == 'NetworkAdmin'){
        user['company'] = user.id.replace(/-/g, ' ');
      } else {
        this.dataService.getSingle(userType, user.id).subscribe(resData => {
          console.log('getRes', resData)
          if (userType == 'BrokerageFirms'){
            companyName = resData.brokerageName;
          }
          else if (userType == 'Employeers'){
            companyName = resData.employeerName;
          } else if (userType == 'LicenseBrokers'){
            companyName = resData.brokerName;         
          } else {
            companyName = null;
          }
          console.log('companyName', companyName)
          user['company'] = companyName;
        })
      }

      this.dataService.getUserDetail('identities', identity[1]).subscribe(resData => {
        let userData: any = {};
        userData = resData;
        user['name'] = userData.name;
        console.log("user: ", user)
        localStorage.removeItem('user');
        this.dataService.saveInLocal('user', user);
      })
    })
  }
}

