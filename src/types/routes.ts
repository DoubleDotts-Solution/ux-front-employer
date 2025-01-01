export enum RoutePermission {
  PUBLIC = "public",
  SEMI_PROTECTED = "semi-protected",
  PROTECTED = "protected",
}

export interface AppRouteObject {
  path?: string;
  element: React.ReactNode;
  permission?: RoutePermission;
  children?: AppRouteObject[];
}
