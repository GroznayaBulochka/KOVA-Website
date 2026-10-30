// Publishing an informational website is distinct from launching app sales.
// A prelaunch publication never claims the unfinished product/legal checks passed.
export function publicationBlockers(config) {
 const profile=config.publicationProfile || 'PRODUCT_LAUNCH';
 const required=['operatorApproved','supportContactApproved','domainApprovedByOwner','hostingVerified','publicationApproved'];
 if(profile!=='PRELAUNCH_WEBSITE')required.push('operatorLegalQualified','supportContactOperationallyVerified','legalApproved');
 const missing=required.filter(key=>config[key]!==true);
 if(!['PRELAUNCH_WEBSITE','PRODUCT_LAUNCH'].includes(profile))missing.push('publicationProfile');
 if(profile==='PRELAUNCH_WEBSITE'){
  if(config.publicDownloadAvailable!==false)missing.push('prelaunch.publicDownloadAvailable=false');
  if(config.storeUrl!==null)missing.push('prelaunch.storeUrl=null');
  if(config.premium?.salesAvailable!==false)missing.push('prelaunch.premium.salesAvailable=false');
  if(config.websiteAnalytics?.enabled!==false)missing.push('prelaunch.websiteAnalytics.enabled=false');
  if(config.legalState!=='DRAFT_OWNER_INPUT_REQUIRED')missing.push('prelaunch.legalState=DRAFT_OWNER_INPUT_REQUIRED');
 }
 if(config.websiteAnalytics?.enabled!==false && config.websiteAnalytics?.accountConfigurationVerified!==true)missing.push('websiteAnalytics.accountConfigurationVerified');
 let validOrigin=false;
 try{const u=new URL(config.canonicalOrigin);validOrigin=u.protocol==='https:'&&u.origin===config.canonicalOrigin&&!u.username&&!u.password;}catch{}
 if(!validOrigin)missing.push('canonicalOrigin');
 return missing;
}
