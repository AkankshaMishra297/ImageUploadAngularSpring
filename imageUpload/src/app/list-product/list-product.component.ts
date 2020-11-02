import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Image} from 'src/app/image';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  images : Image[];

  ngOnInit() {
    this.getAllImage();
  }

  getAllImage() {
    this.httpClient.get<Image[]>('http://localhost:8080/image/getAll')
      .subscribe(
        (res) => {
          this.images = res;
        }
      );
  }

  getBase64ImageSrc(img) {
    return 'data:image/jpeg;base64,' + img;
  }

}
