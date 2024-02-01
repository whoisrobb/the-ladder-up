export type User = {
    Username: string;
};

export type Post = {
    PostID: string;
    Title: string;
    Summary: string;
    content: any;
    User: User;
    Category: string;
    CoverImage: string;
    createdAt: string;
    updatedAt: string;
    UserUserID: string;
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