import { Office } from "src/app/features/floor/floor/floor.component"

export interface Floor {
    floor_id: number
    floor_name: string
    building_name: string
    offices: Office[]
  }