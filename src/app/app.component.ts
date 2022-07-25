import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  forbiddenProjectNames = ["Test"];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        this.forbiddenProject.bind(this),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailAsync),
      status: new FormControl("stable", Validators.required),
    });
  }

  forbiddenProject(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { invalidProjectName: true };
    }

    return null;
  }

  forbiddenEmailAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@gmail.com") {
          resolve({ invalidProjectName: true });
        }
        resolve(null);
      }, 1000);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
