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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for brokeragefirm-frontend', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be brokeragefirm-frontend', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('brokeragefirm-frontend');
    })
  });

  it('network-name should be brokeragefirm-network@0.0.7',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('brokeragefirm-network@0.0.7.bna');
    });
  });

  it('navbar-brand should be brokeragefirm-frontend',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('brokeragefirm-frontend');
    });
  });

  
    it('OpportunityWon component should be loadable',() => {
      page.navigateTo('/OpportunityWon');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OpportunityWon');
      });
    });

    it('OpportunityWon table should have 10 columns',() => {
      page.navigateTo('/OpportunityWon');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('BrokerageFirms component should be loadable',() => {
      page.navigateTo('/BrokerageFirms');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BrokerageFirms');
      });
    });

    it('BrokerageFirms table should have 6 columns',() => {
      page.navigateTo('/BrokerageFirms');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('LicenseBrokers component should be loadable',() => {
      page.navigateTo('/LicenseBrokers');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LicenseBrokers');
      });
    });

    it('LicenseBrokers table should have 11 columns',() => {
      page.navigateTo('/LicenseBrokers');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  
    it('Employeers component should be loadable',() => {
      page.navigateTo('/Employeers');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Employeers');
      });
    });

    it('Employeers table should have 11 columns',() => {
      page.navigateTo('/Employeers');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('CreateLead component should be loadable',() => {
      page.navigateTo('/CreateLead');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CreateLead');
      });
    });
  
    it('Opportunity component should be loadable',() => {
      page.navigateTo('/Opportunity');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Opportunity');
      });
    });
  
    it('OpportunityWIP component should be loadable',() => {
      page.navigateTo('/OpportunityWIP');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('OpportunityWIP');
      });
    });
  
    it('Won component should be loadable',() => {
      page.navigateTo('/Won');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Won');
      });
    });
  
    it('Closure component should be loadable',() => {
      page.navigateTo('/Closure');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Closure');
      });
    });
  

});