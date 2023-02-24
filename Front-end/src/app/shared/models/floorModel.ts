import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";

export interface FloorModel {
   
    id: number;
    floor_name: string;
    building_name: string;
    bookingDate: DateTimePickerModule,
    employee_id: string;
    offices: {
      office_name: string;
      capacity: number;
      desks: {
        desk_id: string;
        occupied: boolean;
      }
    }
  }

