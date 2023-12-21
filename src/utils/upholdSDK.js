import SDK from "@uphold/uphold-sdk-javascript";

const sdk = new SDK({
    baseUrl: "https://api-sandbox.uphold.com",
    clientId: "foo",
    clientSecret: "bar",
});

export default sdk;
