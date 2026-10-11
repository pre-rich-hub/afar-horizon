// Local-only browser verifier. All contact API requests are mocked before reaching the backend.
// Requires google-chrome and a built server at 127.0.0.1:3101.
const {spawn}=require('node:child_process'),fs=require('node:fs'),assert=require('node:assert/strict')
const delay=ms=>new Promise(r=>setTimeout(r,ms))
const chrome=spawn('google-chrome',['--headless=new','--no-sandbox','--disable-dev-shm-usage','--remote-debugging-port=9236','--user-data-dir=/tmp/afar-phase6-browser-profile','about:blank'],{stdio:'ignore'})
let socket
async function main(){
 let target
 for(let i=0;i<60;i++){try{target=await(await fetch('http://127.0.0.1:9236/json/new?about:blank',{method:'PUT'})).json();break}catch{await delay(100)}}
 assert(target);socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}))
 let id=0;const pending=new Map(),requests=[]
 socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}else if(m.method==='Fetch.requestPaused')requests.push(m.params)})
 const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value}
 await send('Page.enable');await send('Runtime.enable')
 await send('Fetch.enable',{patterns:[{urlPattern:'*/api/v1/contact',requestStage:'Request'}]})
 const waitFor=async(expression)=>{for(let i=0;i<150;i++){if(await evaluate(expression))return;await delay(100)}throw Error('Timed out: '+expression)}
 const waitRequest=async count=>{for(let i=0;i<50;i++){if(requests.length===count)return;await delay(50)}throw Error('Expected '+count+' intercepted requests; got '+requests.length)}
 const fulfill=async(req,success)=>send('Fetch.fulfillRequest',{requestId:req.requestId,responseCode:success?200:500,responseHeaders:[{name:'Content-Type',value:'application/json'}],body:Buffer.from(JSON.stringify({success,message:success?'Accepted mock':'Mock failure',data:null})).toString('base64')})
 const reports=[]
 for(const [path,width] of [['/contact',390],['/ground-operations',1440]]){
  requests.length=0
  await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390})
  await send('Page.navigate',{url:'http://127.0.0.1:3101'+path})
  await waitFor(`location.pathname===${JSON.stringify(path)}&&document.readyState==='complete'&&!!document.querySelector('main form')`)
  await delay(1200)
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
  assert.match(data.successText,/Request received|Thank you/)
  assert.equal(data.analyticsRequests,0,'Local build unexpectedly sent analytics')
  assert.equal(data.overflow,false)
  reports.push({path,width,interceptedRequests:requests.length,concurrentDuplicatePrevented:true,failureDisplayed:true,retryAccepted:true,analyticsRequests:0})
  console.log('Passed mocked form lifecycle '+path)
 }
 fs.writeFileSync('docs/seo-phase6-browser.json',JSON.stringify({date:'2026-10-11',mode:'Local production build; every contact API request intercepted and fulfilled; no real enquiries sent',reports},null,2)+'\n')
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{socket?.close();chrome.kill()})
