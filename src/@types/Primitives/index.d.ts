declare global {
  interface StringConstructor {
    isNullorWhiteSpace(input?: string): boolean
  }
}

export {}
