import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  @Input() furtherForm: FormGroup;   // contains 2 FormControl: images[], objectDescription
  filesToUpload = [];

  constructor() { }

  ngOnInit(): void { }

  onFileSend(files: any) {
    for (const file of files) {
      this.filesToUpload.push(file);
    }
    this.furtherForm.get('images').setValue(this.filesToUpload);
  }

  onFileDelete(index: number) {
    this.filesToUpload.splice(index, 1);
    this.furtherForm.get('images').setValue(this.filesToUpload);
  }
}
