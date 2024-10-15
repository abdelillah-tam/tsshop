import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref as stRef, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  async uploadFiles(fileList: File[]) {

    const storage = getStorage();
    let downloadUrls: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const storageRef = stRef(storage, `products/${fileList[i].name}`);
      await uploadBytes(storageRef, fileList[i]);
      let url = await getDownloadURL(storageRef);
      downloadUrls.push(url);
    }

    return downloadUrls;


  }

}
