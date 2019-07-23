import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};




export type Mutation = {
  __typename?: 'Mutation',
  createTodo: Todo,
  deleteTodo: Scalars['Boolean'],
  updateTodo: Todo,
};


export type MutationCreateTodoArgs = {
  newTodo: NewTodoInput
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String']
};


export type MutationUpdateTodoArgs = {
  updatedTodo: UpdatedTodoInput,
  id: Scalars['String']
};

export type NewTodoInput = {
  todo: Scalars['String'],
};

export type Query = {
  __typename?: 'Query',
  getTodos: Array<Todo>,
  getTodo: Todo,
};


export type QueryGetTodosArgs = {
  take?: Maybe<Scalars['Float']>,
  skip?: Maybe<Scalars['Float']>
};


export type QueryGetTodoArgs = {
  id: Scalars['String']
};

export type Todo = {
  __typename?: 'Todo',
  _id: Scalars['String'],
  todo: Scalars['String'],
  completed: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type UpdatedTodoInput = {
  todo?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
};
