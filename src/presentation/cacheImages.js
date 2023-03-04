/**
 * cacheImages takes in an array of images
 * to cache prior to using them.
 */
async function cacheImages(srcArray) {
  const promises = srcArray.map(
    (src) => new Promise((resolve, reject) => {
        const img = new Image();

        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      }),
  );
  await Promise.all(promises);
  const results = await Promise.allSettled(promises);
  results.forEach((result) => console.log(result.status));
}

export default cacheImages;
