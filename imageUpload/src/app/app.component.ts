import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import {Image} from 'src/app/image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(private httpClient: HttpClient) { }

  selectedFile: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  images : Image[];

  ngOnInit(){
    this.getAllImage();
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  

    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {

        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

  getImage() {
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          console.log(this.retrieveResonse)
          this.base64Data = this.retrieveResonse.picByte;
          console.log(this.base64Data)

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          console.log(this.retrievedImage)
        }
      );
  }

  getAllImage() {
    console.log("aaaaaaaaaaaaa")
    this.httpClient.get<Image[]>('http://localhost:8080/image/getAll')
      .subscribe(
        (res) => {
          this.images = res;
          //  this.base64Data = this.images[0].picByte;
          //  this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
      console.log("bbbbbbbbbbbbbbbbbbbbb")
  }

  getBase64ImageSrc(photo) {
    return 'data:image/jpeg;base64,' + photo;
  }
}