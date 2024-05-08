import { EmployeeService } from './services/employee.service';
import { Employee } from './interfaces/employee';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: any[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754,
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199,
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463,
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397,
    },
  ];

  private ngUnsubscribe$ = new Subject<void>();

  addEmployeeForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) {
    this.addEmployeeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        this.noEmptySpacesValidator(),
      ]),
      //   email: new FormControl('', [Validators.required, Validators.email]),
      //   designation: new FormControl('', [
      //     Validators.required,
      //     this.noEmptySpacesValidator(),
      //   ]),

      //   empId: new FormControl('', [Validators.required]),
      //   status: new FormControl(true, [Validators.required]),
    });


  }
  noEmptySpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && value.trim().length < 3) {
        return { noEmptySpaces: true };
      }
      return null;
    };
  }
  get addEmployeeFc() {
    return this.addEmployeeForm.controls;
  }
  submitAddEmployee() {
    console.log(this.addEmployeeForm.value);
  }
  ngOnInit(): void {}

  employeeByName(index: number, employee: any) {
    return employee.empId;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
  
}
