import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: Housinglocation | undefined;
  myForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("")
  })

  constructor(private housingService: HousingService) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation: Housinglocation | undefined) => {
      this.housingLocation = housingLocation
    })
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.myForm.value.firstName ?? "",
      this.myForm.value.lastName ?? "",
      this.myForm.value.email ?? "",
    );
  }
}
