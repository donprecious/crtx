export interface IReview {
id: number;
teamMemberId: number;
customerId: string;
comment: string;
}


export interface IReply {
  id: number;
  reviewId: number;
  message: string;
  repliedby: string;
}
