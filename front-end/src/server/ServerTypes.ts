/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** The details used to register a new user. */
export interface RegistrationDetails {
  name: string;
  /** @format email */
  email: string;
  password: string;
  profilePicture?: string;
}

/** The public information about a user. */
export interface UserDetails {
  id: string;
  name: string;
  profilePicture: string;
}

/** The credentials used to log a user in. */
export interface UserCredentials {
  /** @format email */
  email: string;
  password: string;
}

/** The personal (as opposed to public) details about a user */
export interface PersonalDetails {
  id: string;
  name: string;
  profilePicture: string;
  email: string;
}

/** The fields of a user that need to be updated. Only include the fields that you want changed. */
export interface UserUpdate {
  /** @minLength 1 */
  name?: string;
  /**
   * @format email
   * @minLength 1
   */
  email?: string;
  /** @minLength 1 */
  password?: string;
  /** @minLength 1 */
  profilePicture?: string;
}

/** Used to define a new listing. */
export interface ListingCreation {
  /** The Google Books ID of the book being listed */
  book: string;
}

export type UserCreateData = any;

export type UserCreateError =
  | {
      type: "invalid body";
      expected?: any;
      received?: any;
    }
  | {
      type: "conflict";
      conflicts: Record<string, boolean>;
    };

export type UserListData = UserDetails;

export type UserDeleteData = any;

export type UserPartialUpdateData = any;

export type UserPartialUpdateError = {
  type: "conflict";
  conflicts: Record<string, boolean>;
};

export type SessionCreateData = any;

export type SessionCreateError = UserCredentials;

export type SessionDeleteData = any;

export type GetUserData = PersonalDetails;

export type ListingCreateData = any;

export type ListingCreateError = {
  type: "invalid body";
  expected?: any;
  received?: any;
};

export interface ListingDetailData {
  /** The unique identifier for the listing. */
  id: string;
  /** The book that is listed. */
  book: {
    /** The ID of this book/volume in the Google Books database. */
    id: string;
    /** The authors of this book. */
    authors: string[];
    /**
     * The average rating (1 to 5) of this book on Google.
     * @min 1
     * @max 5
     */
    rating?: number;
    /** The categories of this booke, e.g. "Fiction", "Suspense". */
    categories: string[];
    /** An HTML string containing a description of the book. */
    description: string;
    /** A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value. */
    image: string;
    /** The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like "Title: Subtitle". */
    title: string;
    /** The publication date of the book. */
    publishDate?: string;
  };
  /** The user who posted the listing. */
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
}

export type ListingDeleteData = any;

export type ListingDetailResult = {
  /** The unique identifier for the listing. */
  id: string;
  /** The book that is listed. */
  book: {
    /** The ID of this book/volume in the Google Books database. */
    id: string;
    /** The authors of this book. */
    authors: string[];
    /**
     * The average rating (1 to 5) of this book on Google.
     * @min 1
     * @max 5
     */
    rating?: number;
    /** The categories of this booke, e.g. "Fiction", "Suspense". */
    categories: string[];
    /** An HTML string containing a description of the book. */
    description: string;
    /** A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value. */
    image: string;
    /** The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like "Title: Subtitle". */
    title: string;
    /** The publication date of the book. */
    publishDate?: string;
  };
  /** The user who posted the listing. */
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
}[];

export type UserDetailData = UserDetails[];

export type BookDetailData = {
  /** The ID of this book/volume in the Google Books database. */
  id: string;
  /** The authors of this book. */
  authors: string[];
  /**
   * The average rating (1 to 5) of this book on Google.
   * @min 1
   * @max 5
   */
  rating?: number;
  /** The categories of this booke, e.g. "Fiction", "Suspense". */
  categories: string[];
  /** An HTML string containing a description of the book. */
  description: string;
  /** A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value. */
  image: string;
  /** The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like "Title: Subtitle". */
  title: string;
  /** The publication date of the book. */
  publishDate?: string;
}[];

export type BookDetailError = {
  type: "server";
  message: string;
};

export type ListingsListData = {
  /** The unique identifier for the listing. */
  id: string;
  /** The book that is listed. */
  book: {
    /** The ID of this book/volume in the Google Books database. */
    id: string;
    /** The authors of this book. */
    authors: string[];
    /**
     * The average rating (1 to 5) of this book on Google.
     * @min 1
     * @max 5
     */
    rating?: number;
    /** The categories of this booke, e.g. "Fiction", "Suspense". */
    categories: string[];
    /** An HTML string containing a description of the book. */
    description: string;
    /** A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value. */
    image: string;
    /** The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like "Title: Subtitle". */
    title: string;
    /** The publication date of the book. */
    publishDate?: string;
  };
}[];
