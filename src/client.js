import Prismic from "prismic-javascript";

const apiEndpoint = "https://rsvp.cdn.prismic.io/api/v2";
const Client = Prismic.client(apiEndpoint);

export default Client;