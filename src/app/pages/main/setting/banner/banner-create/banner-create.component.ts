import { Component, OnInit } from '@angular/core';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss']
})
export class BannerCreateComponent extends BaseUploadComponent implements OnInit {
  avatarUrl;

  constructor(
    public s3Service: S3FileService,
  ) {
    super(s3Service);
  }

  ngOnInit(): void {
  }

  getSignedUrl(files) {
    this.multipleUpload(files).subscribe(
      (res) => { },
      (err) => { },
      () => {
      }
    );
  }

}
