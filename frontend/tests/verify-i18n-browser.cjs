// Local-only browser verifier. All contact API requests are mocked before reaching the backend.
// Requires google-chrome and a built server at 127.0.0.1:3101.
const {spawn}=require('node:child_process'),fs=require('node:fs'),assert=require('node:assert/strict')
const delay=ms=>new Promise(r=>setTimeout(r,ms))
const chrome=spawn('google-chrome',['--headless=new','--no-sandbox','--disable-dev-shm-usage','--remote-debugging-port=9237','--user-data-dir=/tmp/afar-phase8-browser-profile','about:blank'],{stdio:'ignore'})
let socket
async function main(){
 let target
 for(let i=0;i<60;i++){try{target=await(await fetch('http://127.0.0.1:9237/json/new?about:blank',{method:'PUT'})).json();break}catch{await delay(100)}}
 assert(target);socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}))
 let id=0;const pending=new Map(),requests=[],exceptions=[]
 socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}else if(m.method==='Fetch.requestPaused')requests.push(m.params);else if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails)})
 const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value}
 await send('Page.enable');await send('Runtime.enable')
 await send('Fetch.enable',{patterns:[{urlPattern:'*/api/v1/contact',requestStage:'Request'}]})
 const waitFor=async(expression)=>{for(let i=0;i<150;i++){if(await evaluate(expression))return;await delay(100)}throw Error('Timed out: '+expression)}
 const waitRequest=async count=>{for(let i=0;i<50;i++){if(requests.length===count)return;await delay(50)}throw Error('Expected '+count+' intercepted requests; got '+requests.length)}
 const fulfill=async(req,success)=>send('Fetch.fulfillRequest',{requestId:req.requestId,responseCode:success?200:500,responseHeaders:[{name:'Content-Type',value:'application/json'}],body:Buffer.from(JSON.stringify({success,message:success?'Accepted mock':'Mock failure',data:null})).toString('base64')})
 const reports=[], layoutReports=[], navigationReports=[]
 const missingOnly=process.argv.includes('--missing-only')
 const previous=missingOnly?JSON.parse(fs.readFileSync('docs/seo-phase8-browser.json','utf8')):{}
 const locales=missingOnly?[]:['fr','es','de','zh-Hans']
 for(const [path,width] of locales.flatMap(locale=>[['/'+locale,390],['/'+locale,1024],['/'+locale,1440],['/'+locale+'/destinations/erta-ale',390],['/'+locale+'/expeditions/danakil-deep',1440],['/'+locale+'/blog/when-to-visit-ethiopia',390],['/'+locale+'/gallery',390]])){
  await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390})
  await send('Page.navigate',{url:'http://127.0.0.1:3101'+path})
  await waitFor(`location.pathname===${JSON.stringify(path)}&&document.readyState!=='loading'&&document.querySelectorAll('main h1').length===1`)
  await delay(700)
  const data=await evaluate(`({path:location.pathname,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,lang:document.documentElement.lang,h1:document.querySelector('main h1').innerText,analytics:performance.getEntriesByType('resource').filter(r=>r.name.includes('/_vercel/insights')).length})`)
  assert.equal(data.overflow,false,path+' overflow at '+width);assert.equal(data.analytics,0);layoutReports.push(data)
  if(path.endsWith('/gallery')){
   const count=await evaluate(`document.querySelectorAll('main ul li').length`)
   assert.equal(count,38)
   await evaluate(`document.querySelectorAll('main [role=group] button')[1].click()`)
   await delay(100)
   const filtered=await evaluate(`document.querySelectorAll('main ul li').length`)
   assert(filtered>0&&filtered<38,'Translated gallery filter lost its category values')
   await evaluate(`document.querySelectorAll('main [role=group] button')[0].click()`)
   await delay(100)
   await evaluate(`document.querySelector('main button[aria-label]').click()`);await waitFor(`!!document.querySelector('[role=dialog]')`)
   const title=await evaluate(`document.querySelector('[role=dialog]').getAttribute('aria-label')`)
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});await delay(150)
   assert.notEqual(await evaluate(`document.querySelector('[role=dialog]').getAttribute('aria-label')`),title)
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await waitFor(`!document.querySelector('[role=dialog]')`)
  }
  console.log('Passed layout '+path+' '+width)
 }
 for(const locale of locales){
  const path='/'+locale+'/plan?expedition=danakil-deep#main'
  await send('Page.navigate',{url:'http://127.0.0.1:3101'+path});await waitFor(`document.readyState!=='loading'&&location.pathname==='/${locale}/plan'&&!!document.querySelector('main form')`);await delay(500)
  const links=await evaluate(`[...document.querySelectorAll('header a[data-locale-link]')].map(a=>a.getAttribute('href'))`)
  assert(links.some(href=>href==='/plan?expedition=danakil-deep#main'));assert(links.some(href=>href==='/de/plan?expedition=danakil-deep#main'))
  assert.equal(await evaluate(`!!document.querySelector('main a[href="/${locale}/ground-operations#partner"]')`),true)
  const target=locale==='fr'?'es':'fr'
  await evaluate(`document.querySelector('header a[data-locale-link][href^="/${target}/plan"]').click()`);await waitFor(`location.pathname==='/${target}/plan'`);await delay(300)
  assert.equal(await evaluate(`location.search+location.hash`),'?expedition=danakil-deep#main')
  navigationReports.push({locale,deepLinkPreserved:true,languageLinkNavigated:true,queryAndFragmentPreserved:true})
 }
 for(const [path,width] of locales.flatMap(locale=>[['/'+locale+'/contact',390],['/'+locale+'/ground-operations',1440]])){
  requests.length=0
  await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390})
  await send('Page.navigate',{url:'http://127.0.0.1:3101'+path})
  await waitFor(`location.pathname===${JSON.stringify(path)}&&document.readyState!=='loading'&&!!document.querySelector('main form')`)
  await delay(1200)
  await evaluate(`document.querySelectorAll('main form button[aria-pressed]')[${path.endsWith('/contact') ? 2 : 0}].click()`)
  await evaluate(`(()=>{const f=document.querySelector('main form');for(const n of f.querySelectorAll('input')){if(n.name==='name')n.value='Browser mock';if(n.name==='email')n.value='browser@example.invalid';if(n.name==='company')n.value='Mock company';n.dispatchEvent(new Event('input',{bubbles:true}))}f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))})()`)
  await waitRequest(1);await delay(200);assert.equal(requests.length,1,'Concurrent submit duplicated request')
  assert.equal(await evaluate(`document.querySelector('main form button[type=submit]').disabled`),true)
  await fulfill(requests[0],false)
  await waitFor(`document.querySelector('main')?.innerText.includes('Mock failure')`)
  assert.equal(await evaluate(`document.querySelector('main form button[type=submit]').disabled`),false)
  await evaluate(`document.querySelector('main form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))`)
  await waitRequest(2);await fulfill(requests[1],true)
  await waitFor(`!document.querySelector('main form')`)
  const data=await evaluate(`({successText:document.querySelector('main').innerText,analyticsRequests:performance.getEntriesByType('resource').filter(r=>r.name.includes('/_vercel/insights')).length,overflow:document.documentElement.scrollWidth>innerWidth+1})`)
  const locale=path.split('/')[1], messages=require('../messages/'+locale+'.json')
  if(path.endsWith('/contact'))assert(data.successText.includes(messages.UI.enquiries.EnquiryForm.requestReceived))
  else assert(!data.successText.includes('Thank you. We will review your programme'))
  for(const request of requests){const payload=JSON.parse(request.request.postData);assert.equal(payload.name,'Browser mock');assert.equal(payload.email,'browser@example.invalid');assert.equal(typeof payload.message,'string');assert(payload.message.includes(path.endsWith('/contact')?'Journey styles: Private, Adventure':'Full ground operation'),'Translated option changed a backend value')}
  assert.equal(data.analyticsRequests,0,'Local build unexpectedly sent analytics')
  assert.equal(data.overflow,false)
  reports.push({path,width,interceptedRequests:requests.length,concurrentDuplicatePrevented:true,failureDisplayed:true,retryAccepted:true,analyticsRequests:0})
  console.log('Passed mocked form lifecycle '+path)
 }
 const missingReports=[]
 for(const path of ['/destinations/not-a-real-place','/fr/blog/not-a-real-article']){
  await send('Page.navigate',{url:'http://127.0.0.1:3101'+path})
  await waitFor(`document.readyState!=='loading'&&document.querySelector('main h1')?.innerText==='This road does not appear on our map'`)
  const status=await evaluate(`fetch(location.href).then(r=>r.status)`)
  assert.equal(status,404)
  missingReports.push({path,status,existingPresentation:true,staticEnglishFallback:true});console.log('Passed static 404 '+path)
 }
 assert.deepEqual(exceptions,[],'Browser runtime exceptions')
 fs.writeFileSync('docs/seo-phase8-browser.json',JSON.stringify({date:'2026-10-11',mode:'Local production build; every contact API request intercepted and fulfilled; no real enquiries sent',reports:missingOnly?previous.reports:reports,layoutReports:missingOnly?previous.layoutReports:layoutReports,navigationReports:missingOnly?previous.navigationReports:navigationReports,missingReports},null,2)+'\n')
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{socket?.close();chrome.kill()})
