import { BloodtypesInterface } from "./IBloodType";
import { GendersInterface } from "./IGender";
import { PersonnelsInterface } from "./IPersonnel";
import { PrenamesInterface } from "./IPrename";
import { ProvincesInterface } from "./IProvince";

export interface PatientrecordInterface {
  ID: string,
  PrenameID: number,
  Prename: PrenamesInterface,
  Firstname: string,
  Lastname: string,
  GenderID: number,
  Gender: GendersInterface,
  Idcardnumber: string,
  Age: number,
  Birthday: Date,
  BloodTypeID: number,
  BloodType: BloodtypesInterface,
  Phonenumber: number,
  Email: string,
  Home: string,
  ProvinceID: number,
  Province: ProvincesInterface,
  Emergencyname: string,
  Emergencyphone: number,
  Timestamp: Date,
  PersonnelID: number,
  Personnel: PersonnelsInterface,
}
