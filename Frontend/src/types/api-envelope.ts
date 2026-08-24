export type ApiSuccessEnvelope<T> = {
  readonly data: T;
};

export type ApiErrorEnvelope = {
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly fields?: ReadonlyArray<{
      readonly path: string;
      readonly message: string;
    }>;
  };
};

export type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorEnvelope;
