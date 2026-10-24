// Only this validated, public subset may be shipped to the browser.
export function publicRelease(config) {
 const followUrl='https://www.instagram.com/kova_money/';
 if(config.followUrl!==followUrl)throw Error('Review the launch channel before changing it');
 let validStore=false;
 try{const url=new URL(config.storeUrl);validStore=url.origin==='https://play.google.com'&&url.pathname==='/store/apps/details'&&url.searchParams.get('id')==='com.kova.budget'&&!url.username&&!url.password;}catch{}
 if(config.publicDownloadAvailable&&(!validStore||config.storeListingVerified!==true))throw Error('Downloads require a verified official Google Play listing');
 return {available:config.publicDownloadAvailable===true&&validStore&&config.storeListingVerified===true,storeUrl:validStore?config.storeUrl:null,followUrl};
}
