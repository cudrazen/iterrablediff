import {
  Component,
  DoCheck,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  VERSION
} from "@angular/core";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements DoCheck {
  a = [1, 2, 3];

  employee1 = { id: 1, name: "Test 1" };
  employee2 = { id: 2, name: "Test 2" };
  employee3 = { id: 1, name: "Test 1" };

  employees = [this.employee1, this.employee2];

  private differ: IterableDiffer<any> = null;

  constructor(private _iterableDiffers: IterableDiffers) {
    this.differ = this._iterableDiffers
      .find(this.employees)
      .create(this.trackByFn);
  }

  ngDoCheck() {
    const changes: IterableChanges<number> = this.differ.diff(this.employees);

    if (changes) {
      changes.forEachAddedItem((item: IterableChangeRecord<number>) => {
        console.log("added ", item);
      });

      changes.forEachMovedItem((item: IterableChangeRecord<number>) => {
        console.log("moved", item);
      });

      changes.forEachRemovedItem((item: IterableChangeRecord<number>) => {
        console.log("removed", item);
      });

      changes.forEachItem((item: IterableChangeRecord<number>) => {
        console.log("item", item);
      });
    }
  }

  btnClicked() {
    this.a = [1, 3, 4];

    this.employees = [this.employee3, this.employee2];
  }

  trackByFn(employee) {
    return employee.id;
  }
}
