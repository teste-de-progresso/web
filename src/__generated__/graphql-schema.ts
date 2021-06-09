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
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type Axis = {
  __typename?: 'Axis';
  id: Scalars['ID'];
  name: Scalars['String'];
  subjects: Array<Subject>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  subjects: Array<Subject>;
};

/** Autogenerated input type of CreateFeedback */
export type CreateFeedbackInput = {
  feedback: SendFeedback;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateFeedback */
export type CreateFeedbackPayload = {
  __typename?: 'CreateFeedbackPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']>;
  feedback?: Maybe<ReviewFeedback>;
};

/** Autogenerated input type of CreateQuestion */
export type CreateQuestionInput = {
  question: QuestionCreateInput;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateQuestion */
export type CreateQuestionPayload = {
  __typename?: 'CreateQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']>;
  question?: Maybe<Question>;
};

export type DateRangeInput = {
  startAt: Scalars['ISO8601Date'];
  endAt: Scalars['ISO8601Date'];
};

/** Autogenerated input type of DestroyQuestion */
export type DestroyQuestionInput = {
  questionId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DestroyQuestion */
export type DestroyQuestionPayload = {
  __typename?: 'DestroyQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedQuestionId?: Maybe<Scalars['ID']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']>;
};

export enum FeedbackStatus {
  Comment = 'comment',
  Approve = 'approve',
  RequestChange = 'request_change'
}

/** Autogenerated input type of FinishQuestion */
export type FinishQuestionInput = {
  questionId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of FinishQuestion */
export type FinishQuestionPayload = {
  __typename?: 'FinishQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']>;
  question?: Maybe<Question>;
};



export type Mutation = {
  __typename?: 'Mutation';
  createFeedback?: Maybe<CreateFeedbackPayload>;
  createQuestion?: Maybe<CreateQuestionPayload>;
  destroyQuestion?: Maybe<DestroyQuestionPayload>;
  finishQuestion?: Maybe<FinishQuestionPayload>;
  updateQuestion?: Maybe<UpdateQuestionPayload>;
};


export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationDestroyQuestionArgs = {
  input: DestroyQuestionInput;
};


export type MutationFinishQuestionArgs = {
  input: FinishQuestionInput;
};


export type MutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  questions: QuestionConnection;
  reviewers: UserConnection;
  subjects: SubjectConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<QuestionWhereInput>;
};


export type QueryReviewersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySubjectsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Question = Node & {
  __typename?: 'Question';
  alternatives: Array<QuestionAlternative>;
  authorshipYear?: Maybe<Scalars['String']>;
  bloomTaxonomy?: Maybe<QuestionBloomTaxonomy>;
  body?: Maybe<Scalars['String']>;
  checkType?: Maybe<QuestionCheckType>;
  createdAt: Scalars['ISO8601DateTime'];
  difficulty?: Maybe<QuestionDifficulty>;
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instruction?: Maybe<Scalars['String']>;
  references?: Maybe<Scalars['String']>;
  reviewFeedbacks: Array<ReviewFeedback>;
  reviewRequests: Array<ReviewRequest>;
  reviewer?: Maybe<User>;
  source?: Maybe<Scalars['String']>;
  status?: Maybe<QuestionStatus>;
  subject?: Maybe<Subject>;
  support?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
};

export type QuestionAlternative = {
  __typename?: 'QuestionAlternative';
  correct: Scalars['Boolean'];
  text?: Maybe<Scalars['String']>;
};

export type QuestionAlternativeInput = {
  correct?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export enum QuestionBloomTaxonomy {
  Remember = 'remember',
  Understand = 'understand',
  Apply = 'apply',
  Analyze = 'analyze',
  Evaluate = 'evaluate',
  Create = 'create'
}

export enum QuestionCheckType {
  UniqueAnswer = 'unique_answer',
  IncompleteAffirmation = 'incomplete_affirmation',
  MultipleAnswer = 'multiple_answer',
  NegativeFocus = 'negative_focus',
  AssertionAndReason = 'assertion_and_reason',
  Gap = 'gap',
  Interpretation = 'interpretation',
  Association = 'association',
  OrderingOrRanking = 'ordering_or_ranking',
  ConstantAlternatives = 'constant_alternatives'
}

/** The connection type for Question. */
export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<QuestionEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Question>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QuestionCreateInput = {
  instruction: Scalars['String'];
  support: Scalars['String'];
  body: Scalars['String'];
  alternatives: Array<QuestionAlternativeInput>;
  explanation: Scalars['String'];
  references: Scalars['String'];
  authorshipYear: Scalars['String'];
  source: Scalars['String'];
  status: QuestionStatus;
  checkType?: Maybe<QuestionCheckType>;
  difficulty?: Maybe<QuestionDifficulty>;
  bloomTaxonomy?: Maybe<QuestionBloomTaxonomy>;
  subjectId?: Maybe<Scalars['ID']>;
  reviewerUserId?: Maybe<Scalars['ID']>;
};

export enum QuestionDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

/** An edge in a connection. */
export type QuestionEdge = {
  __typename?: 'QuestionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Question>;
};

export enum QuestionStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Finished = 'finished'
}

export type QuestionUpdateInput = {
  instruction: Scalars['String'];
  support: Scalars['String'];
  body: Scalars['String'];
  alternatives: Array<QuestionAlternativeInput>;
  explanation: Scalars['String'];
  references: Scalars['String'];
  authorshipYear: Scalars['String'];
  source: Scalars['String'];
  status: QuestionStatus;
  checkType?: Maybe<QuestionCheckType>;
  difficulty?: Maybe<QuestionDifficulty>;
  bloomTaxonomy?: Maybe<QuestionBloomTaxonomy>;
  subjectId?: Maybe<Scalars['ID']>;
  reviewerUserId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type QuestionWhereInput = {
  checkType?: Maybe<Array<QuestionCheckType>>;
  status?: Maybe<Array<QuestionStatus>>;
  difficulty?: Maybe<Array<QuestionDifficulty>>;
  bloomTaxonomy?: Maybe<Array<QuestionBloomTaxonomy>>;
  authorshipYear?: Maybe<Array<Scalars['String']>>;
  source?: Maybe<Scalars['String']>;
  subjectId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
  createDate?: Maybe<DateRangeInput>;
};

export type ReviewFeedback = {
  __typename?: 'ReviewFeedback';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  status: FeedbackStatus;
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
};

export type ReviewRequest = {
  __typename?: 'ReviewRequest';
  answered: Scalars['Boolean'];
  id: Scalars['ID'];
  question: Question;
  responses: Array<ReviewFeedback>;
  user: User;
};

/** The connection type for ReviewRequest. */
export type ReviewRequestConnection = {
  __typename?: 'ReviewRequestConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReviewRequestEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<ReviewRequest>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ReviewRequestEdge = {
  __typename?: 'ReviewRequestEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<ReviewRequest>;
};

export type SendFeedback = {
  questionId: Scalars['ID'];
  status?: Maybe<FeedbackStatus>;
  comment?: Maybe<Scalars['String']>;
};

export type Subject = {
  __typename?: 'Subject';
  axis: Axis;
  category: Category;
  id: Scalars['ID'];
  name: Scalars['String'];
  questions: QuestionConnection;
};


export type SubjectQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<QuestionWhereInput>;
};

/** The connection type for Subject. */
export type SubjectConnection = {
  __typename?: 'SubjectConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SubjectEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Subject>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type SubjectEdge = {
  __typename?: 'SubjectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Subject>;
};

/** Autogenerated input type of UpdateQuestion */
export type UpdateQuestionInput = {
  question: QuestionUpdateInput;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateQuestion */
export type UpdateQuestionPayload = {
  __typename?: 'UpdateQuestionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Errors encountered during execution of the mutation. */
  errors: Array<Scalars['String']>;
  question?: Maybe<Question>;
};

export type User = {
  __typename?: 'User';
  activeReviewRequests: ReviewRequestConnection;
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  inactiveReviewRequests: ReviewRequestConnection;
  name: Scalars['String'];
  roles: Array<UserRoles>;
};


export type UserActiveReviewRequestsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserInactiveReviewRequestsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for User. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

export enum UserRoles {
  Admin = 'admin',
  Teacher = 'teacher',
  Nde = 'nde',
  Coordinator = 'coordinator',
  CenterDirector = 'center_director',
  ProRector = 'pro_rector'
}
