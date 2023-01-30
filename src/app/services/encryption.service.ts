import { Injectable } from "@angular/core";
var CryptoJS = require("crypto-js");

@Injectable()
export class EncryptionService {

  constructor() { }

  public secretKey = "BioHazard22"

  public onEncrypt(data: string) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  public onDecrypt(data: any) {
    var bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}