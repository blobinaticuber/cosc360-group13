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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://books.googleapis.com/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title Books API
 * @version v1
 * @license Creative Commons Attribution 3.0 (http://creativecommons.org/licenses/by/3.0/)
 * @termsOfService https://developers.google.com/terms/
 * @baseUrl https://books.googleapis.com/
 * @externalDocs https://code.google.com/apis/books/docs/v1/getting_started.html
 * @contact Google (https://google.com)
 *
 * The Google Books API allows clients to access the Google Books repository.
 */
export class GoogleBooks<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  books = {
    /**
     * @description Add a user-upload volume and triggers processing.
     *
     * @tags cloudloading
     * @name BooksCloudloadingAddBook
     * @request POST:/books/v1/cloudloading/addBook
     * @secure
     */
    booksCloudloadingAddBook: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** A drive document id. The upload_client_token must not be set. */
        drive_document_id?: string;
        /** The document MIME type. It can be set only if the drive_document_id is set. */
        mime_type?: string;
        /** The document name. It can be set only if the drive_document_id is set. */
        name?: string;
        /** Scotty upload token. */
        upload_client_token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksCloudloadingResource, any>({
        path: `/books/v1/cloudloading/addBook`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Remove the book and its contents
     *
     * @tags cloudloading
     * @name BooksCloudloadingDeleteBook
     * @request POST:/books/v1/cloudloading/deleteBook
     * @secure
     */
    booksCloudloadingDeleteBook: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The id of the book to be removed. */
        volumeId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/cloudloading/deleteBook`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a user-upload volume.
     *
     * @tags cloudloading
     * @name BooksCloudloadingUpdateBook
     * @request POST:/books/v1/cloudloading/updateBook
     * @secure
     */
    booksCloudloadingUpdateBook: (
      data: BooksCloudloadingResource,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksCloudloadingResource, any>({
        path: `/books/v1/cloudloading/updateBook`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of offline dictionary metadata available
     *
     * @tags dictionary
     * @name BooksDictionaryListOfflineMetadata
     * @request GET:/books/v1/dictionary/listOfflineMetadata
     * @secure
     */
    booksDictionaryListOfflineMetadata: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The device/version ID from which to request the data. */
        cpksver: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Metadata, any>({
        path: `/books/v1/dictionary/listOfflineMetadata`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets information regarding the family that the user is part of.
     *
     * @tags familysharing
     * @name BooksFamilysharingGetFamilyInfo
     * @request GET:/books/v1/familysharing/getFamilyInfo
     * @secure
     */
    booksFamilysharingGetFamilyInfo: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<FamilyInfo, any>({
        path: `/books/v1/familysharing/getFamilyInfo`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Initiates sharing of the content with the user's family. Empty response indicates success.
     *
     * @tags familysharing
     * @name BooksFamilysharingShare
     * @request POST:/books/v1/familysharing/share
     * @secure
     */
    booksFamilysharingShare: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The docid to share. */
        docId?: string;
        /** String to identify the originator of this request. */
        source?: string;
        /** The volume to share. */
        volumeId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/familysharing/share`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Initiates revoking content that has already been shared with the user's family. Empty response indicates success.
     *
     * @tags familysharing
     * @name BooksFamilysharingUnshare
     * @request POST:/books/v1/familysharing/unshare
     * @secure
     */
    booksFamilysharingUnshare: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The docid to unshare. */
        docId?: string;
        /** String to identify the originator of this request. */
        source?: string;
        /** The volume to unshare. */
        volumeId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/familysharing/unshare`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the current settings for the user.
     *
     * @tags myconfig
     * @name BooksMyconfigGetUserSettings
     * @request GET:/books/v1/myconfig/getUserSettings
     * @secure
     */
    booksMyconfigGetUserSettings: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Unused. Added only to workaround TEX mandatory request template requirement */
        country?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Usersettings, any>({
        path: `/books/v1/myconfig/getUserSettings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Release downloaded content access restriction.
     *
     * @tags myconfig
     * @name BooksMyconfigReleaseDownloadAccess
     * @request POST:/books/v1/myconfig/releaseDownloadAccess
     * @secure
     */
    booksMyconfigReleaseDownloadAccess: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The device/version ID from which to release the restriction. */
        cpksver: string;
        /** The volume(s) to release restrictions for. */
        volumeIds: string[];
        /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
        locale?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<DownloadAccesses, any>({
        path: `/books/v1/myconfig/releaseDownloadAccess`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Request concurrent and download access restrictions.
     *
     * @tags myconfig
     * @name BooksMyconfigRequestAccess
     * @request POST:/books/v1/myconfig/requestAccess
     * @secure
     */
    booksMyconfigRequestAccess: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The device/version ID from which to request the restrictions. */
        cpksver: string;
        /** The client nonce value. */
        nonce: string;
        /** String to identify the originator of this request. */
        source: string;
        /** The volume to request concurrent/download restrictions for. */
        volumeId: string;
        /** The type of access license to request. If not specified, the default is BOTH. */
        licenseTypes?:
          | "LICENSE_TYPES_UNDEFINED"
          | "BOTH"
          | "CONCURRENT"
          | "DOWNLOAD";
        /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RequestAccessData, any>({
        path: `/books/v1/myconfig/requestAccess`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Request downloaded content access for specified volumes on the My eBooks shelf.
     *
     * @tags myconfig
     * @name BooksMyconfigSyncVolumeLicenses
     * @request POST:/books/v1/myconfig/syncVolumeLicenses
     * @secure
     */
    booksMyconfigSyncVolumeLicenses: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The device/version ID from which to release the restriction. */
        cpksver: string;
        /** The client nonce value. */
        nonce: string;
        /** String to identify the originator of this request. */
        source: string;
        /** List of features supported by the client, i.e., 'RENTALS' */
        features?: ("FEATURES_UNDEFINED" | "RENTALS")[];
        /** Set to true to include non-comics series. Defaults to false. */
        includeNonComicsSeries?: boolean;
        /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
        locale?: string;
        /** Set to true to show pre-ordered books. Defaults to false. */
        showPreorders?: boolean;
        /** The volume(s) to request download restrictions for. */
        volumeIds?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/myconfig/syncVolumeLicenses`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Sets the settings for the user. If a sub-object is specified, it will overwrite the existing sub-object stored in the server. Unspecified sub-objects will retain the existing value.
     *
     * @tags myconfig
     * @name BooksMyconfigUpdateUserSettings
     * @request POST:/books/v1/myconfig/updateUserSettings
     * @secure
     */
    booksMyconfigUpdateUserSettings: (
      data: Usersettings,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Usersettings, any>({
        path: `/books/v1/myconfig/updateUserSettings`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a list of annotations, possibly filtered.
     *
     * @tags mylibrary
     * @name BooksMylibraryAnnotationsList
     * @request GET:/books/v1/mylibrary/annotations
     * @secure
     */
    booksMylibraryAnnotationsList: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The content version for the requested volume. */
        contentVersion?: string;
        /** The layer ID to limit annotation by. */
        layerId?: string;
        /** The layer ID(s) to limit annotation by. */
        layerIds?: string[];
        /**
         * Maximum number of results to return
         * @min 0
         * @max 40
         */
        maxResults?: number;
        /** The value of the nextToken from the previous page. */
        pageToken?: string;
        /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
        showDeleted?: boolean;
        /** String to identify the originator of this request. */
        source?: string;
        /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
        updatedMax?: string;
        /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
        updatedMin?: string;
        /** The volume to restrict annotations to. */
        volumeId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Annotations, any>({
        path: `/books/v1/mylibrary/annotations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Inserts a new annotation.
     *
     * @tags mylibrary
     * @name BooksMylibraryAnnotationsInsert
     * @request POST:/books/v1/mylibrary/annotations
     * @secure
     */
    booksMylibraryAnnotationsInsert: (
      data: Annotation,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The ID for the annotation to insert. */
        annotationId?: string;
        /** ISO-3166-1 code to override the IP-based location. */
        country?: string;
        /** Requests that only the summary of the specified layer be provided in the response. */
        showOnlySummaryInResponse?: boolean;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Annotation, any>({
        path: `/books/v1/mylibrary/annotations`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the summary of specified layers.
     *
     * @tags mylibrary
     * @name BooksMylibraryAnnotationsSummary
     * @request POST:/books/v1/mylibrary/annotations/summary
     * @secure
     */
    booksMylibraryAnnotationsSummary: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Array of layer IDs to get the summary for. */
        layerIds: string[];
        /** Volume id to get the summary for. */
        volumeId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AnnotationsSummary, any>({
        path: `/books/v1/mylibrary/annotations/summary`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes an annotation.
     *
     * @tags mylibrary
     * @name BooksMylibraryAnnotationsDelete
     * @request DELETE:/books/v1/mylibrary/annotations/{annotationId}
     * @secure
     */
    booksMylibraryAnnotationsDelete: (
      annotationId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/mylibrary/annotations/${annotationId}`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates an existing annotation.
     *
     * @tags mylibrary
     * @name BooksMylibraryAnnotationsUpdate
     * @request PUT:/books/v1/mylibrary/annotations/{annotationId}
     * @secure
     */
    booksMylibraryAnnotationsUpdate: (
      annotationId: string,
      data: Annotation,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Annotation, any>({
        path: `/books/v1/mylibrary/annotations/${annotationId}`,
        method: "PUT",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a list of bookshelves belonging to the authenticated user.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesList
     * @request GET:/books/v1/mylibrary/bookshelves
     * @secure
     */
    booksMylibraryBookshelvesList: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Bookshelves, any>({
        path: `/books/v1/mylibrary/bookshelves`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves metadata for a specific bookshelf belonging to the authenticated user.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesGet
     * @request GET:/books/v1/mylibrary/bookshelves/{shelf}
     * @secure
     */
    booksMylibraryBookshelvesGet: (
      shelf: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Bookshelf, any>({
        path: `/books/v1/mylibrary/bookshelves/${shelf}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a volume to a bookshelf.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesAddVolume
     * @request POST:/books/v1/mylibrary/bookshelves/{shelf}/addVolume
     * @secure
     */
    booksMylibraryBookshelvesAddVolume: (
      shelf: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ID of volume to add. */
        volumeId: string;
        /** The reason for which the book is added to the library. */
        reason?: "REASON_UNDEFINED" | "IOS_PREX" | "IOS_SEARCH" | "ONBOARDING";
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/mylibrary/bookshelves/${shelf}/addVolume`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Clears all volumes from a bookshelf.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesClearVolumes
     * @request POST:/books/v1/mylibrary/bookshelves/{shelf}/clearVolumes
     * @secure
     */
    booksMylibraryBookshelvesClearVolumes: (
      shelf: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/mylibrary/bookshelves/${shelf}/clearVolumes`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Moves a volume within a bookshelf.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesMoveVolume
     * @request POST:/books/v1/mylibrary/bookshelves/{shelf}/moveVolume
     * @secure
     */
    booksMylibraryBookshelvesMoveVolume: (
      shelf: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ID of volume to move. */
        volumeId: string;
        /** Position on shelf to move the item (0 puts the item before the current first item, 1 puts it between the first and the second and so on.) */
        volumePosition: number;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/mylibrary/bookshelves/${shelf}/moveVolume`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes a volume from a bookshelf.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesRemoveVolume
     * @request POST:/books/v1/mylibrary/bookshelves/{shelf}/removeVolume
     * @secure
     */
    booksMylibraryBookshelvesRemoveVolume: (
      shelf: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ID of volume to remove. */
        volumeId: string;
        /** The reason for which the book is removed from the library. */
        reason?: "REASON_UNDEFINED" | "ONBOARDING";
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/mylibrary/bookshelves/${shelf}/removeVolume`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets volume information for volumes on a bookshelf.
     *
     * @tags mylibrary
     * @name BooksMylibraryBookshelvesVolumesList
     * @request GET:/books/v1/mylibrary/bookshelves/{shelf}/volumes
     * @secure
     */
    booksMylibraryBookshelvesVolumesList: (
      shelf: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ISO-3166-1 code to override the IP-based location. */
        country?: string;
        /**
         * Maximum number of results to return
         * @min 0
         */
        maxResults?: number;
        /** Restrict information returned to a set of selected fields. */
        projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
        /** Full-text search query string in this bookshelf. */
        q?: string;
        /** Set to true to show pre-ordered books. Defaults to false. */
        showPreorders?: boolean;
        /** String to identify the originator of this request. */
        source?: string;
        /**
         * Index of the first element to return (starts at 0)
         * @min 0
         */
        startIndex?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/mylibrary/bookshelves/${shelf}/volumes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves my reading position information for a volume.
     *
     * @tags mylibrary
     * @name BooksMylibraryReadingpositionsGet
     * @request GET:/books/v1/mylibrary/readingpositions/{volumeId}
     * @secure
     */
    booksMylibraryReadingpositionsGet: (
      volumeId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Volume content version for which this reading position is requested. */
        contentVersion?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReadingPosition, any>({
        path: `/books/v1/mylibrary/readingpositions/${volumeId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Sets my reading position information for a volume.
     *
     * @tags mylibrary
     * @name BooksMylibraryReadingpositionsSetPosition
     * @request POST:/books/v1/mylibrary/readingpositions/{volumeId}/setPosition
     * @secure
     */
    booksMylibraryReadingpositionsSetPosition: (
      volumeId: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Position string for the new volume reading position. */
        position: string;
        /** RFC 3339 UTC format timestamp associated with this reading position. */
        timestamp: string;
        /** Action that caused this reading position to be set. */
        action?:
          | "ACTION_UNDEFINED"
          | "bookmark"
          | "chapter"
          | "next-page"
          | "prev-page"
          | "scroll"
          | "search";
        /** Volume content version for which this reading position applies. */
        contentVersion?: string;
        /** Random persistent device cookie optional on set position. */
        deviceCookie?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/mylibrary/readingpositions/${volumeId}/setPosition`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns notification details for a given notification id.
     *
     * @tags notification
     * @name BooksNotificationGet
     * @request GET:/books/v1/notification/get
     * @secure
     */
    booksNotificationGet: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the notification. */
        notification_id: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating notification title and body. */
        locale?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Notification, any>({
        path: `/books/v1/notification/get`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List categories for onboarding experience.
     *
     * @tags onboarding
     * @name BooksOnboardingListCategories
     * @request GET:/books/v1/onboarding/listCategories
     * @secure
     */
    booksOnboardingListCategories: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Category, any>({
        path: `/books/v1/onboarding/listCategories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List available volumes under categories for onboarding experience.
     *
     * @tags onboarding
     * @name BooksOnboardingListCategoryVolumes
     * @request GET:/books/v1/onboarding/listCategoryVolumes
     * @secure
     */
    booksOnboardingListCategoryVolumes: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** List of category ids requested. */
        categoryId?: string[];
        /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
        locale?: string;
        /** The maximum allowed maturity rating of returned volumes. Books with a higher maturity rating are filtered out. */
        maxAllowedMaturityRating?:
          | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
          | "MATURE"
          | "not-mature";
        /** Number of maximum results per page to be included in the response. */
        pageSize?: number;
        /** The value of the nextToken from the previous page. */
        pageToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volume2, any>({
        path: `/books/v1/onboarding/listCategoryVolumes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a stream of personalized book clusters
     *
     * @tags personalizedstream
     * @name BooksPersonalizedstreamGet
     * @request GET:/books/v1/personalizedstream/get
     * @secure
     */
    booksPersonalizedstreamGet: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
        locale?: string;
        /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
        maxAllowedMaturityRating?:
          | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
          | "MATURE"
          | "not-mature";
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Discoveryclusters, any>({
        path: `/books/v1/personalizedstream/get`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Accepts the promo offer.
     *
     * @tags promooffer
     * @name BooksPromoofferAccept
     * @request POST:/books/v1/promooffer/accept
     * @secure
     */
    booksPromoofferAccept: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** device android_id */
        androidId?: string;
        /** device device */
        device?: string;
        /** device manufacturer */
        manufacturer?: string;
        /** device model */
        model?: string;
        offerId?: string;
        /** device product */
        product?: string;
        /** device serial */
        serial?: string;
        /** Volume id to exercise the offer */
        volumeId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/promooffer/accept`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Marks the promo offer as dismissed.
     *
     * @tags promooffer
     * @name BooksPromoofferDismiss
     * @request POST:/books/v1/promooffer/dismiss
     * @secure
     */
    booksPromoofferDismiss: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** device android_id */
        androidId?: string;
        /** device device */
        device?: string;
        /** device manufacturer */
        manufacturer?: string;
        /** device model */
        model?: string;
        /** Offer to dimiss */
        offerId?: string;
        /** device product */
        product?: string;
        /** device serial */
        serial?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Empty, any>({
        path: `/books/v1/promooffer/dismiss`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a list of promo offers available to the user
     *
     * @tags promooffer
     * @name BooksPromoofferGet
     * @request GET:/books/v1/promooffer/get
     * @secure
     */
    booksPromoofferGet: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** device android_id */
        androidId?: string;
        /** device device */
        device?: string;
        /** device manufacturer */
        manufacturer?: string;
        /** device model */
        model?: string;
        /** device product */
        product?: string;
        /** device serial */
        serial?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Offers, any>({
        path: `/books/v1/promooffer/get`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns Series metadata for the given series ids.
     *
     * @tags series
     * @name BooksSeriesGet
     * @request GET:/books/v1/series/get
     * @secure
     */
    booksSeriesGet: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String that identifies the series */
        series_id: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Series, any>({
        path: `/books/v1/series/get`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns Series membership data given the series id.
     *
     * @tags series
     * @name BooksSeriesMembershipGet
     * @request GET:/books/v1/series/membership/get
     * @secure
     */
    booksSeriesMembershipGet: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String that identifies the series */
        series_id: string;
        /** Number of maximum results per page to be included in the response. */
        page_size?: number;
        /** The value of the nextToken from the previous page. */
        page_token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Seriesmembership, any>({
        path: `/books/v1/series/membership/get`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a list of public bookshelves for the specified user.
     *
     * @tags bookshelves
     * @name BooksBookshelvesList
     * @request GET:/books/v1/users/{userId}/bookshelves
     * @secure
     */
    booksBookshelvesList: (
      userId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Bookshelves, any>({
        path: `/books/v1/users/${userId}/bookshelves`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves metadata for a specific bookshelf for the specified user.
     *
     * @tags bookshelves
     * @name BooksBookshelvesGet
     * @request GET:/books/v1/users/{userId}/bookshelves/{shelf}
     * @secure
     */
    booksBookshelvesGet: (
      userId: string,
      shelf: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Bookshelf, any>({
        path: `/books/v1/users/${userId}/bookshelves/${shelf}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves volumes in a specific bookshelf for the specified user.
     *
     * @tags bookshelves
     * @name BooksBookshelvesVolumesList
     * @request GET:/books/v1/users/{userId}/bookshelves/{shelf}/volumes
     * @secure
     */
    booksBookshelvesVolumesList: (
      userId: string,
      shelf: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /**
         * Maximum number of results to return
         * @min 0
         */
        maxResults?: number;
        /** Set to true to show pre-ordered books. Defaults to false. */
        showPreorders?: boolean;
        /** String to identify the originator of this request. */
        source?: string;
        /**
         * Index of the first element to return (starts at 0)
         * @min 0
         */
        startIndex?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/users/${userId}/bookshelves/${shelf}/volumes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Performs a book search.
     *
     * @tags volumes
     * @name BooksVolumesList
     * @request GET:/books/v1/volumes
     * @secure
     */
    booksVolumesList: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Full-text search query string. */
        q: string;
        /** Restrict to volumes by download availability. */
        download?: "DOWNLOAD_UNDEFINED" | "EPUB";
        /** Filter search results. */
        filter?:
          | "FILTER_UNDEFINED"
          | "ebooks"
          | "free-ebooks"
          | "full"
          | "paid-ebooks"
          | "partial";
        /** Restrict results to books with this language code. */
        langRestrict?: string;
        /** Restrict search to this user's library. */
        libraryRestrict?:
          | "LIBRARY_RESTRICT_UNDEFINED"
          | "my-library"
          | "no-restrict";
        /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
        maxAllowedMaturityRating?:
          | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
          | "MATURE"
          | "not-mature";
        /**
         * Maximum number of results to return.
         * @min 0
         * @max 40
         */
        maxResults?: number;
        /** Sort search results. */
        orderBy?: "ORDER_BY_UNDEFINED" | "newest" | "relevance";
        /** Restrict and brand results for partner ID. */
        partner?: string;
        /** Restrict to books or magazines. */
        printType?: "PRINT_TYPE_UNDEFINED" | "ALL" | "BOOKS" | "MAGAZINES";
        /** Restrict information returned to a set of selected fields. */
        projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
        /** Set to true to show books available for preorder. Defaults to false. */
        showPreorders?: boolean;
        /** String to identify the originator of this request. */
        source?: string;
        /**
         * Index of the first result to return (starts at 0)
         * @min 0
         */
        startIndex?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/volumes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of books in My Library.
     *
     * @tags volumes
     * @name BooksVolumesMybooksList
     * @request GET:/books/v1/volumes/mybooks
     * @secure
     */
    booksVolumesMybooksList: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** How the book was acquired */
        acquireMethod?: (
          | "ACQUIRE_METHOD_UNDEFINED"
          | "FAMILY_SHARED"
          | "PREORDERED"
          | "PREVIOUSLY_RENTED"
          | "PUBLIC_DOMAIN"
          | "PURCHASED"
          | "RENTED"
          | "SAMPLE"
          | "UPLOADED"
        )[];
        /** ISO-3166-1 code to override the IP-based location. */
        country?: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating recommendations. */
        locale?: string;
        /**
         * Maximum number of results to return.
         * @min 0
         * @max 100
         */
        maxResults?: number;
        /** The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod. */
        processingState?: (
          | "PROCESSING_STATE_UNDEFINED"
          | "COMPLETED_FAILED"
          | "COMPLETED_SUCCESS"
          | "RUNNING"
        )[];
        /** String to identify the originator of this request. */
        source?: string;
        /**
         * Index of the first result to return (starts at 0)
         * @min 0
         */
        startIndex?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/volumes/mybooks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of recommended books for the current user.
     *
     * @tags volumes
     * @name BooksVolumesRecommendedList
     * @request GET:/books/v1/volumes/recommended
     * @secure
     */
    booksVolumesRecommendedList: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
        locale?: string;
        /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
        maxAllowedMaturityRating?:
          | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
          | "MATURE"
          | "not-mature";
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/volumes/recommended`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Rate a recommended book for the current user.
     *
     * @tags volumes
     * @name BooksVolumesRecommendedRate
     * @request POST:/books/v1/volumes/recommended/rate
     * @secure
     */
    booksVolumesRecommendedRate: (
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Rating to be given to the volume. */
        rating: "RATING_UNDEFINED" | "HAVE_IT" | "NOT_INTERESTED";
        /** ID of the source volume. */
        volumeId: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
        locale?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksVolumesRecommendedRateResponse, any>({
        path: `/books/v1/volumes/recommended/rate`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of books uploaded by the current user.
     *
     * @tags volumes
     * @name BooksVolumesUseruploadedList
     * @request GET:/books/v1/volumes/useruploaded
     * @secure
     */
    booksVolumesUseruploadedList: (
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
        locale?: string;
        /**
         * Maximum number of results to return.
         * @min 0
         * @max 40
         */
        maxResults?: number;
        /** The processing state of the user uploaded volumes to be returned. */
        processingState?: (
          | "PROCESSING_STATE_UNDEFINED"
          | "COMPLETED_FAILED"
          | "COMPLETED_SUCCESS"
          | "RUNNING"
        )[];
        /** String to identify the originator of this request. */
        source?: string;
        /**
         * Index of the first result to return (starts at 0)
         * @min 0
         */
        startIndex?: number;
        /** The ids of the volumes to be returned. If not specified all that match the processingState are returned. */
        volumeId?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/volumes/useruploaded`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets volume information for a single volume.
     *
     * @tags volumes
     * @name BooksVolumesGet
     * @request GET:/books/v1/volumes/{volumeId}
     * @secure
     */
    booksVolumesGet: (
      volumeId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** ISO-3166-1 code to override the IP-based location. */
        country?: string;
        /** Set to true to include non-comics series. Defaults to false. */
        includeNonComicsSeries?: boolean;
        /** Brand results for partner ID. */
        partner?: string;
        /** Restrict information returned to a set of selected fields. */
        projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
        /** string to identify the originator of this request. */
        source?: string;
        user_library_consistent_read?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volume, any>({
        path: `/books/v1/volumes/${volumeId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Return a list of associated books.
     *
     * @tags volumes
     * @name BooksVolumesAssociatedList
     * @request GET:/books/v1/volumes/{volumeId}/associated
     * @secure
     */
    booksVolumesAssociatedList: (
      volumeId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** Association type. */
        association?:
          | "ASSOCIATION_UNDEFINED"
          | "end-of-sample"
          | "end-of-volume"
          | "related-for-play";
        /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
        locale?: string;
        /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
        maxAllowedMaturityRating?:
          | "MAX_ALLOWED_MATURITY_RATING_UNDEFINED"
          | "MATURE"
          | "not-mature";
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumes, any>({
        path: `/books/v1/volumes/${volumeId}/associated`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the volume annotations for a volume and layer.
     *
     * @tags layers
     * @name BooksLayersVolumeAnnotationsList
     * @request GET:/books/v1/volumes/{volumeId}/layers/{layerId}
     * @secure
     */
    booksLayersVolumeAnnotationsList: (
      volumeId: string,
      layerId: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The content version for the requested volume. */
        contentVersion: string;
        /** The end offset to end retrieving data from. */
        endOffset?: string;
        /** The end position to end retrieving data from. */
        endPosition?: string;
        /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
        locale?: string;
        /**
         * Maximum number of results to return
         * @min 0
         * @max 200
         */
        maxResults?: number;
        /** The value of the nextToken from the previous page. */
        pageToken?: string;
        /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
        showDeleted?: boolean;
        /** String to identify the originator of this request. */
        source?: string;
        /** The start offset to start retrieving data from. */
        startOffset?: string;
        /** The start position to start retrieving data from. */
        startPosition?: string;
        /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
        updatedMax?: string;
        /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
        updatedMin?: string;
        /** The version of the volume annotations that you are requesting. */
        volumeAnnotationsVersion?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumeannotations, any>({
        path: `/books/v1/volumes/${volumeId}/layers/${layerId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the volume annotation.
     *
     * @tags layers
     * @name BooksLayersVolumeAnnotationsGet
     * @request GET:/books/v1/volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}
     * @secure
     */
    booksLayersVolumeAnnotationsGet: (
      volumeId: string,
      layerId: string,
      annotationId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
        locale?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Volumeannotation, any>({
        path: `/books/v1/volumes/${volumeId}/layers/${layerId}/annotations/${annotationId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the annotation data for a volume and layer.
     *
     * @tags layers
     * @name BooksLayersAnnotationDataList
     * @request GET:/books/v1/volumes/{volumeId}/layers/{layerId}/data
     * @secure
     */
    booksLayersAnnotationDataList: (
      volumeId: string,
      layerId: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The content version for the requested volume. */
        contentVersion: string;
        /** The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set. */
        annotationDataId?: string[];
        /** The requested pixel height for any images. If height is provided width must also be provided. */
        h?: number;
        /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
        locale?: string;
        /**
         * Maximum number of results to return
         * @min 0
         * @max 200
         */
        maxResults?: number;
        /** The value of the nextToken from the previous page. */
        pageToken?: string;
        /**
         * The requested scale for the image.
         * @min 0
         */
        scale?: number;
        /** String to identify the originator of this request. */
        source?: string;
        /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
        updatedMax?: string;
        /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
        updatedMin?: string;
        /** The requested pixel width for any images. If width is provided height must also be provided. */
        w?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Annotationsdata, any>({
        path: `/books/v1/volumes/${volumeId}/layers/${layerId}/data`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the annotation data.
     *
     * @tags layers
     * @name BooksLayersAnnotationDataGet
     * @request GET:/books/v1/volumes/{volumeId}/layers/{layerId}/data/{annotationDataId}
     * @secure
     */
    booksLayersAnnotationDataGet: (
      volumeId: string,
      layerId: string,
      annotationDataId: string,
      query: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The content version for the volume you are trying to retrieve. */
        contentVersion: string;
        /** For the dictionary layer. Whether or not to allow web definitions. */
        allowWebDefinitions?: boolean;
        /** The requested pixel height for any images. If height is provided width must also be provided. */
        h?: number;
        /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
        locale?: string;
        /**
         * The requested scale for the image.
         * @min 0
         */
        scale?: number;
        /** String to identify the originator of this request. */
        source?: string;
        /** The requested pixel width for any images. If width is provided height must also be provided. */
        w?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DictionaryAnnotationdata, any>({
        path: `/books/v1/volumes/${volumeId}/layers/${layerId}/data/${annotationDataId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List the layer summaries for a volume.
     *
     * @tags layers
     * @name BooksLayersList
     * @request GET:/books/v1/volumes/{volumeId}/layersummary
     * @secure
     */
    booksLayersList: (
      volumeId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The content version for the requested volume. */
        contentVersion?: string;
        /**
         * Maximum number of results to return
         * @min 0
         * @max 200
         */
        maxResults?: number;
        /** The value of the nextToken from the previous page. */
        pageToken?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Layersummaries, any>({
        path: `/books/v1/volumes/${volumeId}/layersummary`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Gets the layer summary for a volume.
     *
     * @tags layers
     * @name BooksLayersGet
     * @request GET:/books/v1/volumes/{volumeId}/layersummary/{summaryId}
     * @secure
     */
    booksLayersGet: (
      volumeId: string,
      summaryId: string,
      query?: {
        /** V1 error format. */
        "$.xgafv"?: "1" | "2";
        /** OAuth access token. */
        access_token?: string;
        /** Data format for response. */
        alt?: "json" | "media" | "proto";
        /** JSONP */
        callback?: string;
        /** Selector specifying which fields to include in a partial response. */
        fields?: string;
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string;
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string;
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean;
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string;
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string;
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string;
        /** The content version for the requested volume. */
        contentVersion?: string;
        /** String to identify the originator of this request. */
        source?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Layersummary, any>({
        path: `/books/v1/volumes/${volumeId}/layersummary/${summaryId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
