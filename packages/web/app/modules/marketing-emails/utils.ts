export const isValidLink = (link: string) => {
  const decodedLink = decodeURIComponent(link);

  return /https?:\/\/(platform.neufund\.(org|net|io)|localhost:\d+)(\/api\/newsletter)?\/subscriptions\/\w+\/topics\/news\?signature=\w+&timestamp=\d+$/.test(
    decodedLink,
  );
};
