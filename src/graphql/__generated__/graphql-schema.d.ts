export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type Alternative = {
  readonly correct?: Maybe<Scalars['Boolean']>;
  readonly text?: Maybe<Scalars['String']>;
};

export type Axis = {
  readonly __typename?: 'Axis';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly subjects: ReadonlyArray<Subject>;
};

export type BloomTaxonomy =
  | 'remember'
  | 'understand'
  | 'apply'
  | 'analyze'
  | 'evaluate'
  | 'create';

export type Category = {
  readonly __typename?: 'Category';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly subjects: ReadonlyArray<Subject>;
};

export type Check =
  | 'unique_answer'
  | 'incomplete_affirmation'
  | 'multiple_answer'
  | 'negative_focus'
  | 'assertion_and_reason'
  | 'gap'
  | 'interpretation'
  | 'association'
  | 'ordering_or_ranking'
  | 'constant_alternatives';

export type Difficulty =
  | 'easy'
  | 'medium'
  | 'hard';

export type FeedbackStatus =
  | 'comment'
  | 'approve'
  | 'request_change';

/** Autogenerated input type of Finish */
export type FinishInput = {
  readonly questionId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId?: Maybe<Scalars['String']>;
};


export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly finishQuestion?: Maybe<QuestionResponse>;
  readonly saveQuestion?: Maybe<QuestionResponse>;
  readonly saveQuestionDraft?: Maybe<QuestionResponse>;
  readonly sendFeedback?: Maybe<ReviewFeedbackReponse>;
};


export type MutationFinishQuestionArgs = {
  input: FinishInput;
};


export type MutationSaveQuestionArgs = {
  input: SaveInput;
};


export type MutationSaveQuestionDraftArgs = {
  input: SaveDraftInput;
};


export type MutationSendFeedbackArgs = {
  input: SendFeedbackInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  readonly __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly currentUser?: Maybe<User>;
  readonly question?: Maybe<Question>;
  readonly questions: QuestionConnection;
  readonly reviewers: ReadonlyArray<User>;
  readonly subjects: ReadonlyArray<Subject>;
};


export type QueryQuestionArgs = {
  uuid: Scalars['ID'];
};


export type QueryQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<QuestionWhereInput>;
};

export type Question = {
  readonly __typename?: 'Question';
  readonly alternatives?: Maybe<ReadonlyArray<QuestionAlternative>>;
  readonly authorshipYear?: Maybe<Scalars['String']>;
  readonly bloomTaxonomy?: Maybe<BloomTaxonomy>;
  readonly body?: Maybe<Scalars['String']>;
  readonly checkType?: Maybe<Check>;
  readonly createdAt: Scalars['ISO8601DateTime'];
  readonly difficulty?: Maybe<Difficulty>;
  readonly explanation?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly instruction?: Maybe<Scalars['String']>;
  readonly introduction?: Maybe<Scalars['String']>;
  readonly references?: Maybe<Scalars['String']>;
  readonly reviewFeedbacks: ReadonlyArray<ReviewFeedback>;
  readonly reviewRequests: ReadonlyArray<ReviewRequest>;
  readonly reviewer?: Maybe<User>;
  readonly source?: Maybe<Scalars['String']>;
  readonly status?: Maybe<Status>;
  readonly subject?: Maybe<Subject>;
  readonly support?: Maybe<Scalars['String']>;
  readonly updatedAt: Scalars['ISO8601DateTime'];
  readonly userId?: Maybe<Scalars['Int']>;
  readonly uuid: Scalars['ID'];
};

export type QuestionAlternative = {
  readonly __typename?: 'QuestionAlternative';
  readonly correct: Scalars['Boolean'];
  readonly text?: Maybe<Scalars['String']>;
};

/** The connection type for Question. */
export type QuestionConnection = {
  readonly __typename?: 'QuestionConnection';
  /** A list of edges. */
  readonly edges?: Maybe<ReadonlyArray<Maybe<QuestionEdge>>>;
  /** A list of nodes. */
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Question>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

/** An edge in a connection. */
export type QuestionEdge = {
  readonly __typename?: 'QuestionEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node?: Maybe<Question>;
};

export type QuestionResponse = {
  readonly __typename?: 'QuestionResponse';
  readonly errors?: Maybe<ReadonlyArray<ResponseError>>;
  readonly payload?: Maybe<Question>;
};

export type QuestionWhereInput = {
  readonly checkType?: Maybe<ReadonlyArray<Check>>;
  readonly status?: Maybe<ReadonlyArray<Status>>;
  readonly difficulty?: Maybe<ReadonlyArray<Difficulty>>;
  readonly bloomTaxonomy?: Maybe<ReadonlyArray<BloomTaxonomy>>;
  readonly authorshipYear?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly userId?: Maybe<Scalars['ID']>;
};

export type ResponseError = {
  readonly __typename?: 'ResponseError';
  readonly fieldName?: Maybe<Scalars['String']>;
  readonly fullMessages: ReadonlyArray<Scalars['String']>;
  readonly messages?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly path?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type ReviewFeedback = {
  readonly __typename?: 'ReviewFeedback';
  readonly comment?: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['ISO8601DateTime'];
  readonly id: Scalars['ID'];
  readonly status: FeedbackStatus;
  readonly updatedAt: Scalars['ISO8601DateTime'];
  readonly user: User;
};

export type ReviewFeedbackReponse = {
  readonly __typename?: 'ReviewFeedbackReponse';
  readonly errors?: Maybe<ReadonlyArray<ResponseError>>;
  readonly payload?: Maybe<ReviewFeedback>;
};

export type ReviewRequest = {
  readonly __typename?: 'ReviewRequest';
  readonly answered: Scalars['Boolean'];
  readonly id: Scalars['ID'];
  readonly question: Question;
  readonly responses: ReadonlyArray<ReviewFeedback>;
  readonly user: User;
};

/** The connection type for ReviewRequest. */
export type ReviewRequestConnection = {
  readonly __typename?: 'ReviewRequestConnection';
  /** A list of edges. */
  readonly edges?: Maybe<ReadonlyArray<Maybe<ReviewRequestEdge>>>;
  /** A list of nodes. */
  readonly nodes?: Maybe<ReadonlyArray<Maybe<ReviewRequest>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ReviewRequestEdge = {
  readonly __typename?: 'ReviewRequestEdge';
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node?: Maybe<ReviewRequest>;
};

/** Autogenerated input type of SaveDraft */
export type SaveDraftInput = {
  readonly question: SaveDraftQuestionInput;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId?: Maybe<Scalars['String']>;
};

export type SaveDraftQuestionInput = {
  readonly id?: Maybe<Scalars['ID']>;
  readonly instruction?: Maybe<Scalars['String']>;
  readonly support?: Maybe<Scalars['String']>;
  readonly body?: Maybe<Scalars['String']>;
  readonly alternatives?: Maybe<ReadonlyArray<Alternative>>;
  readonly explanation?: Maybe<Scalars['String']>;
  readonly references?: Maybe<Scalars['String']>;
  readonly checkType?: Maybe<Check>;
  readonly difficulty?: Maybe<Difficulty>;
  readonly bloomTaxonomy?: Maybe<BloomTaxonomy>;
  readonly authorshipYear?: Maybe<Scalars['String']>;
  readonly source?: Maybe<Scalars['String']>;
  readonly subjectId?: Maybe<Scalars['ID']>;
  readonly reviewerId?: Maybe<Scalars['ID']>;
};

/** Autogenerated input type of Save */
export type SaveInput = {
  readonly question: SaveQuestionInput;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId?: Maybe<Scalars['String']>;
};

export type SaveQuestionInput = {
  readonly id?: Maybe<Scalars['ID']>;
  readonly instruction: Scalars['String'];
  readonly support: Scalars['String'];
  readonly body: Scalars['String'];
  readonly alternatives: ReadonlyArray<Alternative>;
  readonly explanation: Scalars['String'];
  readonly references: Scalars['String'];
  readonly checkType: Check;
  readonly difficulty: Difficulty;
  readonly bloomTaxonomy: BloomTaxonomy;
  readonly authorshipYear: Scalars['String'];
  readonly source: Scalars['String'];
  readonly subjectId: Scalars['ID'];
  readonly reviewerId: Scalars['ID'];
};

export type SendFeedback = {
  readonly questionId: Scalars['ID'];
  readonly status?: Maybe<FeedbackStatus>;
  readonly comment?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of SendFeedback */
export type SendFeedbackInput = {
  readonly feedback: SendFeedback;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId?: Maybe<Scalars['String']>;
};

export type Status =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'finished';

export type Subject = {
  readonly __typename?: 'Subject';
  readonly axis: Axis;
  readonly category: Category;
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly questions: ReadonlyArray<Question>;
};

export type User = {
  readonly __typename?: 'User';
  readonly activeReviewRequests: ReviewRequestConnection;
  readonly avatarUrl?: Maybe<Scalars['String']>;
  readonly email: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly name?: Maybe<Scalars['String']>;
  readonly roles: ReadonlyArray<UserRoles>;
};


export type UserActiveReviewRequestsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserRoles =
  | 'admin'
  | 'teacher'
  | 'nde'
  | 'coordinator'
  | 'center_director'
  | 'pro_rector';