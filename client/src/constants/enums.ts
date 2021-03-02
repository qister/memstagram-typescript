export enum ContentPath {
    Feed = '/feed',
    Statistics= '/statistics',
    Profile = '/profile',
    Add = '/add'
}

export enum IFetchingStatus {
  idle = 'idle',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}