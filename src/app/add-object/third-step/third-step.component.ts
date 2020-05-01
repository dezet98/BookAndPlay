import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  furtherForm: FormGroup;
  filesToUpload = [];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.furtherForm = this.fb.group({
      file: [''],
      objectDescription: ['']
    });
  }

  onFileSend(files: any) {
    for (const file of files) {
      this.filesToUpload.push(file);
    }
  }

  onFileDelete(index: number) {
    this.filesToUpload.splice(index, 1);
  }

  onUpload() {
    console.log('I will should upload! formData:');
  }
}
