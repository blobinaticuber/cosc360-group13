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
  /** @format email */
  email: string;
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

/** Specifies the fields to update for a listing. */
export interface ListingUpdate {
  /** Set this to `true` if you want to mark the listing as available, and `false` if you want to mark it as unavailable. */
  available: boolean;
}

/** The details used to register a new admin user. */
export interface AdminRegistration {
  name: string;
  /** @format email */
  email: string;
  password: string;
  profilePicture?: string;
  adminKey: string;
}

/** The public information about an admin user. */
export interface AdminDetails {
  id: string;
  name: string;
  profilePicture: string;
}

/** The personal (as opposed to public) details about an admin user */
export interface AdminPersonalDetails {
  id: string;
  name: string;
  profilePicture: string;
  email: string;
}

/** The fields of an admin user that need to be updated. Only include the fields that you want changed. */
export interface AdminUserUpdate {
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

/** Contains some statistics about the current listings. */
export interface ListingsAnalytics {
  /**
   * The total number of listings, including ones marked as unavaible.
   * @min 0
   */
  totalListings: number;
  /**
   * The total number of listings marked unavaible.
   * @min 0
   */
  listingsMarkedUnavailable: number;
  /**
   * The average number of listings per user.
   * @min 0
   */
  averageListingsPerUser: number;
  /** Lists the top 10 users with the most listings. */
  usersWithTheMostListings: {
    /** The public information about a user. */
    user: UserDetails;
    /**
     * The total number of listings posted by the user.
     * @min 0
     */
    listingCount: number;
    /**
     * The number of currently-available listings posted by the user.
     * @min 0
     */
    availableListingCount: number;
  }[];
}

/** Some basic statistics about users. */
export interface UserAnalytics {
  /**
   * The total number of users.
   * @min 0
   */
  totalUsers: number;
  /**
   * The total number of user sessions (i.e., logins) from the past 30 days.
   * @min 0
   */
  activeSessions: number;
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
    rating?: number | null;
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
    /** @format email */
    email: string;
  };
  /** The availability of the listing. */
  available: boolean;
}

export type ListingDeleteData = any;

export type ListingPartialUpdateData = any;

export type ListingPartialUpdateError = {
  type: "invalid body";
  expected?: any;
  received?: any;
};

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
    rating?: number | null;
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
    /** @format email */
    email: string;
  };
  /** The availability of the listing. */
  available: boolean;
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
  rating?: number | null;
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
    rating?: number | null;
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
  /** The availability of the listing. */
  available: boolean;
}[];

export type ListedDetailData = {
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
    rating?: number | null;
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
  listings: {
    /** The unique identifier for the listing. */
    id: string;
    /** The user who posted the listing. */
    user: {
      id: string;
      name: string;
      profilePicture: string;
      /** @format email */
      email: string;
    };
    /** The availability of the listing. */
    available: boolean;
  }[];
}[];

export type BrowseListData = {
  category: string;
  /** @min 0 */
  listingCount: number;
  topBooks: {
    /** The ID of this book/volume in the Google Books database. */
    id: string;
    /** The authors of this book. */
    authors: string[];
    /**
     * The average rating (1 to 5) of this book on Google.
     * @min 1
     * @max 5
     */
    rating?: number | null;
    /** An HTML string containing a description of the book. */
    description: string;
    /** A URL to an image of the book's cover. If Google's database doesn't have such an image, then this uses a default value. */
    image: string;
    /** The title (and subtitle, if there is one) of the book. The subtitle is separated from the title like "Title: Subtitle". */
    title: string;
    /** The publication date of the book. */
    publishDate?: string;
    listings: {
      /** The unique identifier for the listing. */
      id: string;
      /** The user who posted the listing. */
      user: {
        id: string;
        name: string;
        profilePicture: string;
        /** @format email */
        email: string;
      };
      /** The availability of the listing. */
      available: boolean;
    }[];
  }[];
}[];

export type ReportUpdateData = any;

export type ReportUpdateError = {
  type: "invalid body";
  expected?: any;
  received?: any;
};

export type ReportDeleteData = any;

export type UserCreateResult = any;

export type UserCreateFail =
  | {
      type: "invalid body";
      expected?: any;
      received?: any;
    }
  | {
      type: "conflict";
      conflicts: Record<string, boolean>;
    };

export type UserListResult = AdminDetails;

export type UserDeleteResult = any;

export type UserPartialUpdateResult = any;

export type UserPartialUpdateFail = {
  type: "conflict";
  conflicts: Record<string, boolean>;
};

export type UserSessionCreateData = any;

export type UserSessionDeleteData = any;

export type UserMeListData = AdminPersonalDetails;

export type SuspendDeleteData = any;

export type ReportsListData = {
  /** The ID of the user that is reported. */
  user: string;
  /** The reports submitted against this user. */
  reports: {
    /** The ID of the report. */
    id: string;
    /** The user who submitted the report */
    submittedBy: string;
    /** The explanation given when submitting the report. This may be empty. */
    explanation: string;
  }[];
}[];

export type ListingsListResult = ListingsAnalytics;

export type UsersListData = UserAnalytics;
