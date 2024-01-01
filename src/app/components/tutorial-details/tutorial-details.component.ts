import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    course_code: '',
    course_name: '',
    course_decript: '',
    year: '',
    group: 0,
    number: 0,
    IsActive: false
  };

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {

    this.message = '';

    this.tutorialService.patchActive(this.currentTutorial._id, status).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTutorial.IsActive = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message = '';
    const isConfirmed = confirm('Are you sure you want to update this course?');
    if (isConfirmed) {
      this.tutorialService
        .update(this.currentTutorial._id, this.currentTutorial)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = res.message
              ? res.message
              : 'This tutorial was updated successfully!';
            alert(this.message);
          },
          error: (e) => {
            console.error(e);
            alert('An error occurred while updating the tutorial.');
          }
        });
    }
  }

  deleteTutorial(): void {
    this.message = '';
    const isConfirmed = confirm('Are you sure you want to delete this course?');
    if (isConfirmed) {
      this.tutorialService.delete(this.currentTutorial._id).subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Course deleted successfully!';
          alert(this.message);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => {
          console.error(e);
          alert('An error occurred while deleting the course.');
        }
      });
    }
  }

}
