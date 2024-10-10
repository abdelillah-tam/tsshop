import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref as stRef, uploadBytes } from 'firebase/storage';
import { getDatabase, set, ref as dbRef }  from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {

    const storage = getStorage();

    const storageRef = stRef(storage, `products/${file.name}`);

    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(downloadURL => this._saveToDB(downloadURL, file.name));
    })
  }

  private _saveToDB(downloadUrl: string, fileName: string){
    const database = getDatabase();
    set(dbRef(database, 'products/' + fileName.replace('.', '')), {
      downloadURL: downloadUrl
    })
  }
}
