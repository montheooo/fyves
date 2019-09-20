import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


export class Email {
	to: string;
	subject: string;
	body: string;
}

@Injectable()
export class EmailService {

	url: string;

	constructor(public http: HttpClient) {
		this.url = 'http://www.intelcameroun.net/fyvessapback/index.php'
	  }

    sendEmail (data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/send_email', JSON.stringify(data),  {responseType: 'text'})
          .subscribe(res => {
            console.log(res);
            resolve(res);
            
          }, (err) => {
            console.log(err) ;
            reject(err);
          });
      });
    }

	 sendEmail2 (data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/send_email2', JSON.stringify(data),  {responseType: 'text'})
        .subscribe(res => {
          console.log(res);
          resolve(res);
          
        }, (err) => {
          console.log(err) ;
          reject(err);
        });
    });

    
  }
}