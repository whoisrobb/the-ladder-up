export type User = {
    Username: string;
    FirstName: string;
    LastName: string;
};

type Comment = {
  CommentID: string;
  UserUserID: string;
  Content: string;
  User: User;
  createdAt: string;
  updatedAt: string;
}

export type TPost = {
    Category: string;
    Content: any;
    CoverImage: string;
    PostID: string;
    Title: string;
    Summary: string;
    User: User;
    createdAt: string;
    updatedAt: string;
    UserUserID: string;
    Comments: Comment[];
};

export type Context = {
    Content: string;
    Summary: string;
    Title: string;
}

export type Result = {
    PostID: string;
    context: Context;
}