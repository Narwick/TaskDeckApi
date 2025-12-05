import {
  ADM_LEVEL1,
  ADM_LEVEL2,
  SUB_LEVEL1,
  SUB_LEVEL2,
  SUB_LEVEL3,
} from '../../../infrastructure/database/models/UsrUser';

export const admLv1 = (req: any, res: any, next: any) => {
  const permissions = req.permissions || [];
  permissions.push(ADM_LEVEL1);
  req.permissions = permissions;
  next();
};
export const admLv2 = (req: any, res: any, next: any) => {
  const permissions = req.permissions || [];
  permissions.push(ADM_LEVEL2);
  req.permissions = permissions;
  next();
};

export const subLv1 = (req: any, res: any, next: any) => {
  const permissions = req.permissions || [];
  permissions.push(SUB_LEVEL1);
  req.permissions = permissions;
  next();
};
export const subLv2 = (req: any, res: any, next: any) => {
  const permissions = req.permissions || [];
  permissions.push(SUB_LEVEL2);
  req.permissions = permissions;
  next();
};
export const subLv3 = (req: any, res: any, next: any) => {
  const permissions = req.permissions || [];
  permissions.push(SUB_LEVEL3);
  req.permissions = permissions;
  next();
};
