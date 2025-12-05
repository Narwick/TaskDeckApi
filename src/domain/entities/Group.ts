import { BaseEntity } from './BaseEntity';

export class GroupEntity extends BaseEntity {
  gro_id?:number;
  gro_name?:string;
  gro_type?:string;
  gro_status?:number;
  gro_created_at?:Date;
  gro_updated_at?:Date;
  constructor(init?: any) {
    super();
    Object.assign(this, init);
  }
}

export default GroupEntity;
