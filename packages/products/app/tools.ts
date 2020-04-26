export const isDomainError = (data: any): data is { isError: boolean; message: string } => data.isError;
