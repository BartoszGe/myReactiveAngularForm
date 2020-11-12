import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames: string[];

  ngOnInit(): void {
    this.forbiddenUsernames = ['Kuba', 'Anna'];
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNameValidator.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailValidator)
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value => console.log(value))
    // );
    // this.signupForm.statusChanges.subscribe(
    //   (status => console.log(status))
    // );
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  getControls(): AbstractControl[] {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNameValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.includes(control.value)) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmailValidator(control: FormControl): Promise<any> | Observable<any> {

    return new Promise<any>(((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    }));
  }
}
