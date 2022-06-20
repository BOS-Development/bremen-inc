export interface Coupon {
  id: string;
  entityId: string;
  entityName: string;
  modified?: string;
  type: string;
  value: string;
  isNew?: boolean;
  deleted?: boolean;
}
