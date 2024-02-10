 export function createImageUrl(photoBuffer) {
    var blob = new Blob([new Uint8Array(photoBuffer.data)], {
      type: "image/jpeg",
    });
    var imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }