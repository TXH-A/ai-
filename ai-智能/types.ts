export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
}

export interface GeneratedResult {
  imageUrl: string | null;
  error: string | null;
}
