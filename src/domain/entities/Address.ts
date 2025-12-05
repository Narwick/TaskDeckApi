import { BaseEntity } from './BaseEntity';

export class AddressEntity extends BaseEntity {
  add_id?:number;
  add_cep?:string;
  add_street?:string;
  add_number?:number;
  add_district?:string;
  add_city?:string;
  add_state?:string;
  add_status?:number;
  add_created_at?:Date;
  add_updated_at?:Date;
  constructor(init?: any) {
    super();
    Object.assign(this, init);
  }
}

export default AddressEntity;
