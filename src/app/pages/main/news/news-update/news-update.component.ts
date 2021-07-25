import { Component, OnInit } from '@angular/core';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']
})
export class NewsUpdateComponent extends BaseUploadComponent implements OnInit {
  avatarUrl;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    outline: false,
  };

  constructor(
    public s3Service: S3FileService,
  ) {
    super(s3Service);
  }

  ngOnInit(): void {
  }

  getSignedUrl(files) {
    this.selectImage(files).subscribe(
      (res) => { },
      (err) => { },
      () => {
        this.avatarUrl = this.imageLinkUpload;
      }
    )

  }

}
