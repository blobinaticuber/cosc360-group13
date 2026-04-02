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

export interface Annotation {
  /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  afterSelectedText?: string;
  /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
  beforeSelectedText?: string;
  /** Selection ranges sent from the client. */
  clientVersionRanges?: {
    /** Range in CFI format for this annotation sent by client. */
    cfiRange?: BooksAnnotationsRange;
    /** Content version the client sent in. */
    contentVersion?: string;
    /** Range in GB image format for this annotation sent by client. */
    gbImageRange?: BooksAnnotationsRange;
    /** Range in GB text format for this annotation sent by client. */
    gbTextRange?: BooksAnnotationsRange;
    /** Range in image CFI format for this annotation sent by client. */
    imageCfiRange?: BooksAnnotationsRange;
  };
  /** Timestamp for the created time of this annotation. */
  created?: string;
  /** Selection ranges for the most recent content version. */
  currentVersionRanges?: {
    /** Range in CFI format for this annotation for version above. */
    cfiRange?: BooksAnnotationsRange;
    /** Content version applicable to ranges below. */
    contentVersion?: string;
    /** Range in GB image format for this annotation for version above. */
    gbImageRange?: BooksAnnotationsRange;
    /** Range in GB text format for this annotation for version above. */
    gbTextRange?: BooksAnnotationsRange;
    /** Range in image CFI format for this annotation for version above. */
    imageCfiRange?: BooksAnnotationsRange;
  };
  /** User-created data for this annotation. */
  data?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** The highlight style for this annotation. */
  highlightStyle?: string;
  /** Id of this annotation, in the form of a GUID. */
  id?: string;
  /** Resource type. */
  kind?: string;
  /** The layer this annotation is for. */
  layerId?: string;
  layerSummary?: {
    /**
     * Maximum allowed characters on this layer, especially for the "copy" layer.
     * @format int32
     */
    allowedCharacterCount?: number;
    /** Type of limitation on this layer. "limited" or "unlimited" for the "copy" layer. */
    limitType?: string;
    /**
     * Remaining allowed characters on this layer, especially for the "copy" layer.
     * @format int32
     */
    remainingCharacterCount?: number;
  };
  /** Pages that this annotation spans. */
  pageIds?: string[];
  /** Excerpt from the volume. */
  selectedText?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time this annotation was modified. */
  updated?: string;
  /** The volume that this annotation belongs to. */
  volumeId?: string;
}

export interface Annotations {
  /** A list of annotations. */
  items?: Annotation[];
  /** Resource type. */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
  /**
   * Total number of annotations found. This may be greater than the number of notes returned in this response if results have been paginated.
   * @format int32
   */
  totalItems?: number;
}

export interface AnnotationsSummary {
  kind?: string;
  layers?: {
    /** @format int32 */
    allowedCharacterCount?: number;
    layerId?: string;
    limitType?: string;
    /** @format int32 */
    remainingCharacterCount?: number;
    updated?: string;
  }[];
}

export interface Annotationsdata {
  /** A list of Annotation Data. */
  items?: GeoAnnotationdata[];
  /** Resource type */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
  /**
   * The total number of volume annotations found.
   * @format int32
   */
  totalItems?: number;
}

export interface BooksAnnotationsRange {
  /** The offset from the ending position. */
  endOffset?: string;
  /** The ending position for the range. */
  endPosition?: string;
  /** The offset from the starting position. */
  startOffset?: string;
  /** The starting position for the range. */
  startPosition?: string;
}

export interface BooksCloudloadingResource {
  author?: string;
  processingState?: string;
  title?: string;
  volumeId?: string;
}

export interface BooksVolumesRecommendedRateResponse {
  consistency_token?: string;
}

export interface Bookshelf {
  /** Whether this bookshelf is PUBLIC or PRIVATE. */
  access?: string;
  /** Created time for this bookshelf (formatted UTC timestamp with millisecond resolution). */
  created?: string;
  /** Description of this bookshelf. */
  description?: string;
  /**
   * Id of this bookshelf, only unique by user.
   * @format int32
   */
  id?: number;
  /** Resource type for bookshelf metadata. */
  kind?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Title of this bookshelf. */
  title?: string;
  /** Last modified time of this bookshelf (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
  /**
   * Number of volumes in this bookshelf.
   * @format int32
   */
  volumeCount?: number;
  /** Last time a volume was added or removed from this bookshelf (formatted UTC timestamp with millisecond resolution). */
  volumesLastUpdated?: string;
}

export interface Bookshelves {
  /** A list of bookshelves. */
  items?: Bookshelf[];
  /** Resource type. */
  kind?: string;
}

export interface Category {
  /** A list of onboarding categories. */
  items?: {
    badgeUrl?: string;
    categoryId?: string;
    name?: string;
  }[];
  /** Resource type. */
  kind?: string;
}

export interface ConcurrentAccessRestriction {
  /** Whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** Resource type. */
  kind?: string;
  /**
   * The maximum number of concurrent access licenses for this volume.
   * @format int32
   */
  maxConcurrentDevices?: number;
  /** Error/warning message. */
  message?: string;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Error/warning reason code. */
  reasonCode?: string;
  /** Whether this volume has any concurrent access restrictions. */
  restricted?: boolean;
  /** Response signature. */
  signature?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /**
   * Time in seconds for license auto-expiration.
   * @format int32
   */
  timeWindowSeconds?: number;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
}

export interface DictionaryAnnotationdata {
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** JSON encoded data for this dictionary annotation data. Emitted with name 'data' in JSON output. Either this or geo_data will be populated. */
  data?: Dictlayerdata;
  /**
   * Base64 encoded data for this annotation data.
   * @format byte
   */
  encodedData?: Blob;
  /** Unique id for this annotation data. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The volume id for this data. * */
  volumeId?: string;
}

export interface Dictlayerdata {
  common?: {
    /** The display title and localized canonical name to use when searching for this entity on Google search. */
    title?: string;
  };
  dict?: {
    /** The source, url and attribution for this dictionary data. */
    source?: {
      attribution?: string;
      url?: string;
    };
    words?: {
      derivatives?: {
        source?: {
          attribution?: string;
          url?: string;
        };
        text?: string;
      }[];
      examples?: {
        source?: {
          attribution?: string;
          url?: string;
        };
        text?: string;
      }[];
      senses?: {
        conjugations?: {
          type?: string;
          value?: string;
        }[];
        definitions?: {
          definition?: string;
          examples?: {
            source?: {
              attribution?: string;
              url?: string;
            };
            text?: string;
          }[];
        }[];
        partOfSpeech?: string;
        pronunciation?: string;
        pronunciationUrl?: string;
        source?: {
          attribution?: string;
          url?: string;
        };
        syllabification?: string;
        synonyms?: {
          source?: {
            attribution?: string;
            url?: string;
          };
          text?: string;
        }[];
      }[];
      /** The words with different meanings but not related words, e.g. "go" (game) and "go" (verb). */
      source?: {
        attribution?: string;
        url?: string;
      };
    }[];
  };
  kind?: string;
}

export interface Discoveryclusters {
  clusters?: {
    banner_with_content_container?: {
      fillColorArgb?: string;
      imageUrl?: string;
      maskColorArgb?: string;
      moreButtonText?: string;
      moreButtonUrl?: string;
      textColorArgb?: string;
    };
    subTitle?: string;
    title?: string;
    /** @format int32 */
    totalVolumes?: number;
    uid?: string;
    volumes?: Volume[];
  }[];
  /** Resorce type. */
  kind?: string;
  /** @format int32 */
  totalClusters?: number;
}

export interface DownloadAccessRestriction {
  /** If restricted, whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /**
   * If restricted, the number of content download licenses already acquired (including the requesting client, if licensed).
   * @format int32
   */
  downloadsAcquired?: number;
  /** If deviceAllowed, whether access was just acquired with this request. */
  justAcquired?: boolean;
  /** Resource type. */
  kind?: string;
  /**
   * If restricted, the maximum number of content download licenses for this volume.
   * @format int32
   */
  maxDownloadDevices?: number;
  /** Error/warning message. */
  message?: string;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Error/warning reason code. Additional codes may be added in the future. 0 OK 100 ACCESS_DENIED_PUBLISHER_LIMIT 101 ACCESS_DENIED_LIMIT 200 WARNING_USED_LAST_ACCESS */
  reasonCode?: string;
  /** Whether this volume has any download access restrictions. */
  restricted?: boolean;
  /** Response signature. */
  signature?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
}

export interface DownloadAccesses {
  /** A list of download access responses. */
  downloadAccessList?: DownloadAccessRestriction[];
  /** Resource type. */
  kind?: string;
}

/** A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } */
export type Empty = object;

export interface FamilyInfo {
  /** Resource type. */
  kind?: string;
  /** Family membership info of the user that made the request. */
  membership?: {
    /** Restrictions on user buying and acquiring content. */
    acquirePermission?: string;
    /** The age group of the user. */
    ageGroup?: string;
    /** The maximum allowed maturity rating for the user. */
    allowedMaturityRating?: string;
    isInFamily?: boolean;
    /** The role of the user in the family. */
    role?: string;
  };
}

export interface GeoAnnotationdata {
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** JSON encoded data for this geo annotation data. Emitted with name 'data' in JSON output. Either this or dict_data will be populated. */
  data?: Geolayerdata;
  /**
   * Base64 encoded data for this annotation data.
   * @format byte
   */
  encodedData?: Blob;
  /** Unique id for this annotation data. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The volume id for this data. * */
  volumeId?: string;
}

export interface Geolayerdata {
  common?: {
    /** The language of the information url and description. */
    lang?: string;
    /** The URL for the preview image information. */
    previewImageUrl?: string;
    /** The description for this location. */
    snippet?: string;
    /** The URL for information for this location. Ex: wikipedia link. */
    snippetUrl?: string;
    /** The display title and localized canonical name to use when searching for this entity on Google search. */
    title?: string;
  };
  geo?: {
    /** The boundary of the location as a set of loops containing pairs of latitude, longitude coordinates. */
    boundary?: string[];
    /** The cache policy active for this data. EX: UNRESTRICTED, RESTRICTED, NEVER */
    cachePolicy?: string;
    /** The country code of the location. */
    countryCode?: string;
    /**
     * The latitude of the location.
     * @format double
     */
    latitude?: number;
    /**
     * The longitude of the location.
     * @format double
     */
    longitude?: number;
    /** The type of map that should be used for this location. EX: HYBRID, ROADMAP, SATELLITE, TERRAIN */
    mapType?: string;
    /** The viewport for showing this location. This is a latitude, longitude rectangle. */
    viewport?: {
      hi?: {
        /** @format double */
        latitude?: number;
        /** @format double */
        longitude?: number;
      };
      lo?: {
        /** @format double */
        latitude?: number;
        /** @format double */
        longitude?: number;
      };
    };
    /**
     * The Zoom level to use for the map. Zoom levels between 0 (the lowest zoom level, in which the entire world can be seen on one map) to 21+ (down to individual buildings). See: https: //developers.google.com/maps/documentation/staticmaps/#Zoomlevels
     * @format int32
     */
    zoom?: number;
  };
  kind?: string;
}

export interface Layersummaries {
  /** A list of layer summary items. */
  items?: Layersummary[];
  /** Resource type. */
  kind?: string;
  /**
   * The total number of layer summaries found.
   * @format int32
   */
  totalItems?: number;
}

export interface Layersummary {
  /**
   * The number of annotations for this layer.
   * @format int32
   */
  annotationCount?: number;
  /** The list of annotation types contained for this layer. */
  annotationTypes?: string[];
  /** Link to get data for this annotation. */
  annotationsDataLink?: string;
  /** The link to get the annotations for this layer. */
  annotationsLink?: string;
  /** The content version this resource is for. */
  contentVersion?: string;
  /**
   * The number of data items for this layer.
   * @format int32
   */
  dataCount?: number;
  /** Unique id of this layer summary. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The layer id for this summary. */
  layerId?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time an item in this layer was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The current version of this layer's volume annotations. Note that this version applies only to the data in the books.layers.volumeAnnotations.* responses. The actual annotation data is versioned separately. */
  volumeAnnotationsVersion?: string;
  /** The volume id this resource is for. */
  volumeId?: string;
}

export interface Metadata {
  /** A list of offline dictionary metadata. */
  items?: {
    download_url?: string;
    encrypted_key?: string;
    language?: string;
    /** @format int64 */
    size?: string;
    /** @format int64 */
    version?: string;
  }[];
  /** Resource type. */
  kind?: string;
}

export interface Notification {
  body?: string;
  /** The list of crm experiment ids. */
  crmExperimentIds?: string[];
  doc_id?: string;
  doc_type?: string;
  dont_show_notification?: boolean;
  iconUrl?: string;
  is_document_mature?: boolean;
  /** Resource type. */
  kind?: string;
  notificationGroup?: string;
  notification_type?: string;
  pcampaign_id?: string;
  reason?: string;
  show_notification_settings_action?: boolean;
  targetUrl?: string;
  /** @format int64 */
  timeToExpireMs?: string;
  title?: string;
}

export interface Offers {
  /** A list of offers. */
  items?: {
    artUrl?: string;
    gservicesKey?: string;
    id?: string;
    items?: {
      author?: string;
      canonicalVolumeLink?: string;
      coverUrl?: string;
      description?: string;
      title?: string;
      volumeId?: string;
    }[];
  }[];
  /** Resource type. */
  kind?: string;
}

export interface ReadingPosition {
  /** Position in an EPUB as a CFI. */
  epubCfiPosition?: string;
  /** Position in a volume for image-based content. */
  gbImagePosition?: string;
  /** Position in a volume for text-based content. */
  gbTextPosition?: string;
  /** Resource type for a reading position. */
  kind?: string;
  /** Position in a PDF file. */
  pdfPosition?: string;
  /** Timestamp when this reading position was last updated (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
  /** Volume id associated with this reading position. */
  volumeId?: string;
}

export interface RequestAccessData {
  /** A concurrent access response. */
  concurrentAccess?: ConcurrentAccessRestriction;
  /** A download access response. */
  downloadAccess?: DownloadAccessRestriction;
  /** Resource type. */
  kind?: string;
}

export interface Review {
  /** Author of this review. */
  author?: {
    /** Name of this person. */
    displayName?: string;
  };
  /** Review text. */
  content?: string;
  /** Date of this review. */
  date?: string;
  /** URL for the full review text, for reviews gathered from the web. */
  fullTextUrl?: string;
  /** Resource type for a review. */
  kind?: string;
  /** Star rating for this review. Possible values are ONE, TWO, THREE, FOUR, FIVE or NOT_RATED. */
  rating?: string;
  /** Information regarding the source of this review, when the review is not from a Google Books user. */
  source?: {
    /** Name of the source. */
    description?: string;
    /** Extra text about the source of the review. */
    extraDescription?: string;
    /** URL of the source of the review. */
    url?: string;
  };
  /** Title for this review. */
  title?: string;
  /** Source type for this review. Possible values are EDITORIAL, WEB_USER or GOOGLE_USER. */
  type?: string;
  /** Volume that this review is for. */
  volumeId?: string;
}

export interface Series {
  /** Resource type. */
  kind?: string;
  series?: {
    bannerImageUrl?: string;
    eligibleForSubscription?: boolean;
    imageUrl?: string;
    isComplete?: boolean;
    seriesFormatType?: string;
    seriesId?: string;
    seriesSubscriptionReleaseInfo?: {
      cancelTime?: string;
      currentReleaseInfo?: {
        /** @format double */
        amountInMicros?: number;
        currencyCode?: string;
        releaseNumber?: string;
        releaseTime?: string;
      };
      nextReleaseInfo?: {
        /** @format double */
        amountInMicros?: number;
        currencyCode?: string;
        releaseNumber?: string;
        releaseTime?: string;
      };
      seriesSubscriptionType?: string;
    };
    seriesType?: string;
    subscriptionId?: string;
    title?: string;
  }[];
}

export interface Seriesmembership {
  /** Resorce type. */
  kind?: string;
  member?: Volume[];
  nextPageToken?: string;
}

export interface Usersettings {
  /** Resource type. */
  kind?: string;
  /** User settings in sub-objects, each for different purposes. */
  notesExport?: {
    folderName?: string;
    isEnabled?: boolean;
  };
  notification?: {
    matchMyInterests?: {
      opted_state?: string;
    };
    moreFromAuthors?: {
      opted_state?: string;
    };
    moreFromSeries?: {
      opted_state?: string;
    };
    priceDrop?: {
      opted_state?: string;
    };
    rewardExpirations?: {
      opted_state?: string;
    };
  };
}

export interface Volume {
  /** Any information about a volume related to reading or obtaining that volume text. This information can depend on country (books may be public domain in one country but not in another, e.g.). */
  accessInfo?: {
    /** Combines the access and viewability of this volume into a single status field for this user. Values can be FULL_PURCHASED, FULL_PUBLIC_DOMAIN, SAMPLE or NONE. (In LITE projection.) */
    accessViewStatus?: string;
    /** The two-letter ISO_3166-1 country code for which this access information is valid. (In LITE projection.) */
    country?: string;
    /** Information about a volume's download license access restrictions. */
    downloadAccess?: DownloadAccessRestriction;
    /** URL to the Google Drive viewer if this volume is uploaded by the user by selecting the file from Google Drive. */
    driveImportedContentLink?: string;
    /** Whether this volume can be embedded in a viewport using the Embedded Viewer API. */
    embeddable?: boolean;
    /** Information about epub content. (In LITE projection.) */
    epub?: {
      /** URL to retrieve ACS token for epub download. (In LITE projection.) */
      acsTokenLink?: string;
      /** URL to download epub. (In LITE projection.) */
      downloadLink?: string;
      /** Is a flowing text epub available either as public domain or for purchase. (In LITE projection.) */
      isAvailable?: boolean;
    };
    /** Whether this volume requires that the client explicitly request offline download license rather than have it done automatically when loading the content, if the client supports it. */
    explicitOfflineLicenseManagement?: boolean;
    /** Information about pdf content. (In LITE projection.) */
    pdf?: {
      /** URL to retrieve ACS token for pdf download. (In LITE projection.) */
      acsTokenLink?: string;
      /** URL to download pdf. (In LITE projection.) */
      downloadLink?: string;
      /** Is a scanned image pdf available either as public domain or for purchase. (In LITE projection.) */
      isAvailable?: boolean;
    };
    /** Whether or not this book is public domain in the country listed above. */
    publicDomain?: boolean;
    /** Whether quote sharing is allowed for this volume. */
    quoteSharingAllowed?: boolean;
    /** Whether text-to-speech is permitted for this volume. Values can be ALLOWED, ALLOWED_FOR_ACCESSIBILITY, or NOT_ALLOWED. */
    textToSpeechPermission?: string;
    /** For ordered but not yet processed orders, we give a URL that can be used to go to the appropriate Google Wallet page. */
    viewOrderUrl?: string;
    /** The read access of a volume. Possible values are PARTIAL, ALL_PAGES, NO_PAGES or UNKNOWN. This value depends on the country listed above. A value of PARTIAL means that the publisher has allowed some portion of the volume to be viewed publicly, without purchase. This can apply to eBooks as well as non-eBooks. Public domain books will always have a value of ALL_PAGES. */
    viewability?: string;
    /** URL to read this volume on the Google Books site. Link will not allow users to read non-viewable volumes. */
    webReaderLink?: string;
  };
  /** Opaque identifier for a specific version of a volume resource. (In LITE projection) */
  etag?: string;
  /** Unique identifier for a volume. (In LITE projection.) */
  id?: string;
  /** Resource type for a volume. (In LITE projection.) */
  kind?: string;
  /** What layers exist in this volume and high level information about them. */
  layerInfo?: {
    /** A layer should appear here if and only if the layer exists for this book. */
    layers?: {
      /** The layer id of this layer (e.g. "geo"). */
      layerId?: string;
      /** The current version of this layer's volume annotations. Note that this version applies only to the data in the books.layers.volumeAnnotations.* responses. The actual annotation data is versioned separately. */
      volumeAnnotationsVersion?: string;
    }[];
  };
  /** Recommendation related information for this volume. */
  recommendedInfo?: {
    /** A text explaining why this volume is recommended. */
    explanation?: string;
  };
  /** Any information about a volume related to the eBookstore and/or purchaseability. This information can depend on the country where the request originates from (i.e. books may not be for sale in certain countries). */
  saleInfo?: {
    /** URL to purchase this volume on the Google Books site. (In LITE projection) */
    buyLink?: string;
    /** The two-letter ISO_3166-1 country code for which this sale information is valid. (In LITE projection.) */
    country?: string;
    /** Whether or not this volume is an eBook (can be added to the My eBooks shelf). */
    isEbook?: boolean;
    /** Suggested retail price. (In LITE projection.) */
    listPrice?: {
      /**
       * Amount in the currency listed below. (In LITE projection.)
       * @format double
       */
      amount?: number;
      /** An ISO 4217, three-letter currency code. (In LITE projection.) */
      currencyCode?: string;
    };
    /** Offers available for this volume (sales and rentals). */
    offers?: {
      /**
       * The finsky offer type (e.g., PURCHASE=0 RENTAL=3)
       * @format int32
       */
      finskyOfferType?: number;
      /** Indicates whether the offer is giftable. */
      giftable?: boolean;
      /** Offer list (=undiscounted) price in Micros. */
      listPrice?: {
        /** @format double */
        amountInMicros?: number;
        currencyCode?: string;
      };
      /** The rental duration (for rental offers only). */
      rentalDuration?: {
        /** @format double */
        count?: number;
        unit?: string;
      };
      /** Offer retail (=discounted) price in Micros */
      retailPrice?: {
        /** @format double */
        amountInMicros?: number;
        currencyCode?: string;
      };
    }[];
    /** The date on which this book is available for sale. */
    onSaleDate?: string;
    /** The actual selling price of the book. This is the same as the suggested retail or list price unless there are offers or discounts on this volume. (In LITE projection.) */
    retailPrice?: {
      /**
       * Amount in the currency listed below. (In LITE projection.)
       * @format double
       */
      amount?: number;
      /** An ISO 4217, three-letter currency code. (In LITE projection.) */
      currencyCode?: string;
    };
    /** Whether or not this book is available for sale or offered for free in the Google eBookstore for the country listed above. Possible values are FOR_SALE, FOR_RENTAL_ONLY, FOR_SALE_AND_RENTAL, FREE, NOT_FOR_SALE, or FOR_PREORDER. */
    saleability?: string;
  };
  /** Search result information related to this volume. */
  searchInfo?: {
    /** A text snippet containing the search query. */
    textSnippet?: string;
  };
  /** URL to this resource. (In LITE projection.) */
  selfLink?: string;
  /** User specific information related to this volume. (e.g. page this user last read or whether they purchased this book) */
  userInfo?: {
    /** Timestamp when this volume was acquired by the user. (RFC 3339 UTC date-time format) Acquiring includes purchase, user upload, receiving family sharing, etc. */
    acquiredTime?: string;
    /**
     * How this volume was acquired.
     * @format int32
     */
    acquisitionType?: number;
    /** Copy/Paste accounting information. */
    copy?: {
      /** @format int32 */
      allowedCharacterCount?: number;
      limitType?: string;
      /** @format int32 */
      remainingCharacterCount?: number;
      updated?: string;
    };
    /**
     * Whether this volume is purchased, sample, pd download etc.
     * @format int32
     */
    entitlementType?: number;
    /** Information on the ability to share with the family. */
    familySharing?: {
      /** The role of the user in the family. */
      familyRole?: string;
      /** Whether or not this volume can be shared with the family by the user. This includes sharing eligibility of both the volume and the user. If the value is true, the user can initiate a family sharing action. */
      isSharingAllowed?: boolean;
      /** Whether or not sharing this volume is temporarily disabled due to issues with the Family Wallet. */
      isSharingDisabledByFop?: boolean;
    };
    /** Whether or not the user shared this volume with the family. */
    isFamilySharedFromUser?: boolean;
    /** Whether or not the user received this volume through family sharing. */
    isFamilySharedToUser?: boolean;
    /** Deprecated: Replaced by familySharing. */
    isFamilySharingAllowed?: boolean;
    /** Deprecated: Replaced by familySharing. */
    isFamilySharingDisabledByFop?: boolean;
    /** Whether or not this volume is currently in "my books." */
    isInMyBooks?: boolean;
    /** Whether or not this volume was pre-ordered by the authenticated user making the request. (In LITE projection.) */
    isPreordered?: boolean;
    /** Whether or not this volume was purchased by the authenticated user making the request. (In LITE projection.) */
    isPurchased?: boolean;
    /** Whether or not this volume was user uploaded. */
    isUploaded?: boolean;
    /** The user's current reading position in the volume, if one is available. (In LITE projection.) */
    readingPosition?: ReadingPosition;
    /** Period during this book is/was a valid rental. */
    rentalPeriod?: {
      /** @format int64 */
      endUtcSec?: string;
      /** @format int64 */
      startUtcSec?: string;
    };
    /** Whether this book is an active or an expired rental. */
    rentalState?: string;
    /** This user's review of this volume, if one exists. */
    review?: Review;
    /** Timestamp when this volume was last modified by a user action, such as a reading position update, volume purchase or writing a review. (RFC 3339 UTC date-time format). */
    updated?: string;
    userUploadedVolumeInfo?: {
      processingState?: string;
    };
  };
  /** General volume information. */
  volumeInfo?: {
    /** Whether anonymous logging should be allowed. */
    allowAnonLogging?: boolean;
    /** The names of the authors and/or editors for this volume. (In LITE projection) */
    authors?: string[];
    /**
     * The mean review rating for this volume. (min = 1.0, max = 5.0)
     * @format double
     */
    averageRating?: number;
    /** Canonical URL for a volume. (In LITE projection.) */
    canonicalVolumeLink?: string;
    /** A list of subject categories, such as "Fiction", "Suspense", etc. */
    categories?: string[];
    /** Whether the volume has comics content. */
    comicsContent?: boolean;
    /** An identifier for the version of the volume content (text & images). (In LITE projection) */
    contentVersion?: string;
    /** A synopsis of the volume. The text of the description is formatted in HTML and includes simple formatting elements, such as b, i, and br tags. (In LITE projection.) */
    description?: string;
    /** Physical dimensions of this volume. */
    dimensions?: {
      /** Height or length of this volume (in cm). */
      height?: string;
      /** Thickness of this volume (in cm). */
      thickness?: string;
      /** Width of this volume (in cm). */
      width?: string;
    };
    /** A list of image links for all the sizes that are available. (In LITE projection.) */
    imageLinks?: {
      /** Image link for extra large size (width of ~1280 pixels). (In LITE projection) */
      extraLarge?: string;
      /** Image link for large size (width of ~800 pixels). (In LITE projection) */
      large?: string;
      /** Image link for medium size (width of ~575 pixels). (In LITE projection) */
      medium?: string;
      /** Image link for small size (width of ~300 pixels). (In LITE projection) */
      small?: string;
      /** Image link for small thumbnail size (width of ~80 pixels). (In LITE projection) */
      smallThumbnail?: string;
      /** Image link for thumbnail size (width of ~128 pixels). (In LITE projection) */
      thumbnail?: string;
    };
    /** Industry standard identifiers for this volume. */
    industryIdentifiers?: {
      /** Industry specific volume identifier. */
      identifier?: string;
      /** Identifier type. Possible values are ISBN_10, ISBN_13, ISSN and OTHER. */
      type?: string;
    }[];
    /** URL to view information about this volume on the Google Books site. (In LITE projection) */
    infoLink?: string;
    /** Best language for this volume (based on content). It is the two-letter ISO 639-1 code such as 'fr', 'en', etc. */
    language?: string;
    /** The main category to which this volume belongs. It will be the category from the categories list returned below that has the highest weight. */
    mainCategory?: string;
    maturityRating?: string;
    /**
     * Total number of pages as per publisher metadata.
     * @format int32
     */
    pageCount?: number;
    /** A top-level summary of the panelization info in this volume. */
    panelizationSummary?: {
      containsEpubBubbles?: boolean;
      containsImageBubbles?: boolean;
      epubBubbleVersion?: string;
      imageBubbleVersion?: string;
    };
    /** URL to preview this volume on the Google Books site. */
    previewLink?: string;
    /** Type of publication of this volume. Possible values are BOOK or MAGAZINE. */
    printType?: string;
    /**
     * Total number of printed pages in generated pdf representation.
     * @format int32
     */
    printedPageCount?: number;
    /** Date of publication. (In LITE projection.) */
    publishedDate?: string;
    /** Publisher of this volume. (In LITE projection.) */
    publisher?: string;
    /**
     * The number of review ratings for this volume.
     * @format int32
     */
    ratingsCount?: number;
    /** The reading modes available for this volume. */
    readingModes?: {
      image?: boolean;
      text?: boolean;
    };
    /**
     * Total number of sample pages as per publisher metadata.
     * @format int32
     */
    samplePageCount?: number;
    seriesInfo?: Volumeseriesinfo;
    /** Volume subtitle. (In LITE projection.) */
    subtitle?: string;
    /** Volume title. (In LITE projection.) */
    title?: string;
  };
}

export interface Volume2 {
  /** A list of volumes. */
  items?: Volume[];
  /** Resource type. */
  kind?: string;
  nextPageToken?: string;
}

export interface Volumeannotation {
  /** The annotation data id for this volume annotation. */
  annotationDataId?: string;
  /** Link to get data for this annotation. */
  annotationDataLink?: string;
  /** The type of annotation this is. */
  annotationType?: string;
  /** The content ranges to identify the selected text. */
  contentRanges?: {
    /** Range in CFI format for this annotation for version above. */
    cfiRange?: BooksAnnotationsRange;
    /** Content version applicable to ranges below. */
    contentVersion?: string;
    /** Range in GB image format for this annotation for version above. */
    gbImageRange?: BooksAnnotationsRange;
    /** Range in GB text format for this annotation for version above. */
    gbTextRange?: BooksAnnotationsRange;
  };
  /** Data for this annotation. */
  data?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** Unique id of this volume annotation. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The Layer this annotation is for. */
  layerId?: string;
  /** Pages the annotation spans. */
  pageIds?: string[];
  /** Excerpt from the volume. */
  selectedText?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time this anntoation was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The Volume this annotation is for. */
  volumeId?: string;
}

export interface Volumeannotations {
  /** A list of volume annotations. */
  items?: Volumeannotation[];
  /** Resource type */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
  /**
   * The total number of volume annotations found.
   * @format int32
   */
  totalItems?: number;
  /** The version string for all of the volume annotations in this layer (not just the ones in this response). Note: the version string doesn't apply to the annotation data, just the information in this response (e.g. the location of annotations in the book). */
  version?: string;
}

export interface Volumes {
  /** A list of volumes. */
  items?: Volume[];
  /** Resource type. */
  kind?: string;
  /**
   * Total number of volumes found. This might be greater than the number of volumes returned in this response if results have been paginated.
   * @format int32
   */
  totalItems?: number;
}

export interface Volumeseriesinfo {
  /** The display number string. This should be used only for display purposes and the actual sequence should be inferred from the below orderNumber. */
  bookDisplayNumber?: string;
  /** Resource type. */
  kind?: string;
  /** Short book title in the context of the series. */
  shortSeriesBookTitle?: string;
  volumeSeries?: {
    /** List of issues. Applicable only for Collection Edition and Omnibus. */
    issue?: {
      issueDisplayNumber?: string;
      /** @format int32 */
      issueOrderNumber?: number;
    }[];
    /**
     * The book order number in the series.
     * @format int32
     */
    orderNumber?: number;
    /** The book type in the context of series. Examples - Single Issue, Collection Edition, etc. */
    seriesBookType?: string;
    /** The series id. */
    seriesId?: string;
  }[];
}
