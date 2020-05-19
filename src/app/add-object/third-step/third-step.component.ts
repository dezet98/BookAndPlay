import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FacilityService } from 'src/app/_services/facility.service';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit {
  @Input() furtherForm: FormGroup;   // contains 2 FormControl: images[], objectDescription
  filesToUpload: Array<File> = [];

  constructor(private facilityService: FacilityService) { }

  ngOnInit(): void { }

  onFileSend(files: any) {
    for (const file of files) {
      this.filesToUpload.push(file as File);
    }

    if (this.filesToUpload.length >= 1) {
      console.log('create fd from:');
      console.log(this.filesToUpload[0]);
      const fd = new FormData();
      fd.append('image', this.filesToUpload[0], this.filesToUpload[0].name);

      this.furtherForm.get('images').setValue(fd);

      this.facilityService.uploadImage(fd).subscribe((res) => {
        console.log(res);
        console.log('chyba ok');
      }, error => { console.log(error); console.log('nie ok'); });
    }

  }

  onFileDelete(index: number) {
    this.filesToUpload.splice(index, 1);
    this.furtherForm.get('images').setValue(this.filesToUpload);
  }
}
