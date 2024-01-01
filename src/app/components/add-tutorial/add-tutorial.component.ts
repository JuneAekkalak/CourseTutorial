import { Component } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    course_code: '',
    course_name: '',
    course_decript: '',
    year: '',
    group: 0,
    number: 0
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  saveTutorial(): void {
    const data = {
      course_code: this.tutorial.course_code,
      course_name: this.tutorial.course_name,
      course_decript: this.tutorial.course_decript,
      year: this.tutorial.year,
      group: this.tutorial.group,
      number: this.tutorial.number
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      course_code: '',
      course_name: '',
      course_decript: '',
      year: '',
      group: 0,
      number: 0
    };
  }
}
