import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent extends BaseUploadComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    outline: false,
  };
  avatarUrl;

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
