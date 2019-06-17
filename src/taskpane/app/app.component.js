import { Component } from '@angular/core';
const template = require('./app.component.html');
import _ from 'lodash';

@Component({
  selector: 'app-home',
  template
})
export default class AppComponent {
  welcomeMessage = 'Welcome';

  async run() {
    try {
      await Excel.run(async context => {
        window.context = context;
        /**
         * Insert your Excel code here
         */
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const range = sheet.getUsedRange();

        // Read the range address
        range.load("address");
        range.load("values");
        // Update the fill color


        await context.sync();
        console.log(`The range address was ${range.address}.`);
        // console.log(`Values are ${range.values}`);
        let headers = range.values.shift();
        console.log(`Headers ${headers}`);
        headers = headers.map((h)=>(_.camelCase(h)));
        let data = range.values.map((a)=>{
          return _.zipObject(headers, a);
        });
        document.getElementById("jsonOut").value = JSON.stringify(data, null, 2);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
