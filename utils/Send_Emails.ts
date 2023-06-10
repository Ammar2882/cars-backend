import SibApiV3Sdk from 'sib-api-v3-sdk'
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = `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`;

export const sendEmail = async (email:string,user:string,text:string) => {
new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
  {
    subject:'Password',
    sender : {email:'carsdirectory@gmail.com', name:'Cars Directory'},
    to : [{name: user, email:email}],
    htmlContent : '<html><body><h1>Your Password is {{params.bodyMessage}}</h1></body></html>',
    params : {bodyMessage:text}
  }
).then(function(data:any) {
  console.log(data);
}, function(error:any) {
  console.error(error);
});
};






