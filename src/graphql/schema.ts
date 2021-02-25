
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class CreatePostInput {
    title: string;
    content: string;
}

export class CreateUserInput {
    email: string;
    password: string;
    name?: string;
}

export class EditPostInput {
    postId: number;
    title?: string;
    content?: string;
}

export class EditProfileInput {
    name?: string;
    password?: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract getPost(id: number): GetPostOutput | Promise<GetPostOutput>;

    abstract getPosts(authorId?: string): GetPostsOutput | Promise<GetPostsOutput>;

    abstract hello(name: string): string | Promise<string>;

    abstract helloWorld(): string | Promise<string>;

    abstract me(): UserProfileOutput | Promise<UserProfileOutput>;

    abstract userProfile(email: string): UserProfileOutput | Promise<UserProfileOutput>;
}

export abstract class IMutation {
    abstract createPost(input: CreatePostInput): CreatePostOutput | Promise<CreatePostOutput>;

    abstract createUser(input: CreateUserInput): CreateUserOutput | Promise<CreateUserOutput>;

    abstract deletePost(id: number): DeletePostOutput | Promise<DeletePostOutput>;

    abstract editPost(input: EditPostInput): EditPostOutput | Promise<EditPostOutput>;

    abstract editProfile(input: EditProfileInput): EditProfileOutput | Promise<EditProfileOutput>;

    abstract login(input: LoginInput): LoginOutput | Promise<LoginOutput>;

    abstract refreshToken(): RefreshTokenOutput | Promise<RefreshTokenOutput>;
}

export class User {
    email: string;
    id: string;
    name?: string;
    posts: Post[];
    registeredAt: DateTime;
    role: Role;
    updatedAt: DateTime;
}

export class Post {
    author: User;
    authorId: string;
    content: string;
    createdAt: DateTime;
    id: number;
    title: string;
    updatedAt: DateTime;
}

export class GetPostOutput {
    ok: boolean;
    error?: string;
    post?: Post;
}

export class GetPostsOutput {
    ok: boolean;
    error?: string;
    posts?: Post[];
}

export class UserProfileOutput {
    ok: boolean;
    error?: string;
    user?: User;
}

export class CreatePostOutput {
    ok: boolean;
    error?: string;
}

export class CreateUserOutput {
    ok: boolean;
    error?: string;
}

export class DeletePostOutput {
    ok: boolean;
    error?: string;
}

export class EditPostOutput {
    ok: boolean;
    error?: string;
}

export class EditProfileOutput {
    ok: boolean;
    error?: string;
}

export class LoginOutput {
    ok: boolean;
    error?: string;
    accessToken?: string;
    refreshToken?: string;
}

export class RefreshTokenOutput {
    ok: boolean;
    error?: string;
    accessToken?: string;
    refreshToken?: string;
}

export type DateTime = any;
