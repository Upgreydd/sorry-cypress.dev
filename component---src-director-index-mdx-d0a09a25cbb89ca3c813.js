(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"RVs+":function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return s})),n.d(t,"default",(function(){return d}));var r=n("Fcif"),i=n("+I+c"),a=(n("mXGw"),n("/FXl")),o=n("TjRS"),s=(n("aD51"),{});void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/director/index.mdx"}});var c={_frontmatter:s},l=o.a;function d(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)(l,Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"overview"},"Overview"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"director")," service is responsible for:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"paralellization and coordination of test runs"),Object(a.b)("li",{parentName:"ul"},"saving tests results"),Object(a.b)("li",{parentName:"ul"},"saving failed tests screenshots")),Object(a.b)("p",null,"When you launch Cypress on a CI environment with multiple machines, each machine first contacts the dashboard to get the next test to run."),Object(a.b)("p",null,"The dashboard coordinates the requests from different machines and assigns tests to each."),Object(a.b)("h2",{id:"starting-the-service"},"Starting the service"),Object(a.b)("pre",null,Object(a.b)("code",{className:"language-sh",parentName:"pre"},'cd packages/director\n\nnpm install\nnpm run build\nnpm run start\n\n# ...\n\nInitializing "in-memory" execution driver...\nInitializing "dummy" screenshots driver...\nListening on 1234...\n')),Object(a.b)("p",null,"By default, the service will run on port ",Object(a.b)("inlineCode",{parentName:"p"},"1234")," with ",Object(a.b)("inlineCode",{parentName:"p"},"in-memory")," execution driver and ",Object(a.b)("inlineCode",{parentName:"p"},"dummy")," storage driver."),Object(a.b)("h2",{id:"drivers"},"Drivers"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"director"),' uses "drivers" that define different aspects of its functionality. You can choose or implement different type of drivers to support the desired functionality. There\'re several community-supported drivers listed below.'),Object(a.b)("h2",{id:"configuration"},"Configuration"),Object(a.b)("p",null,"The service uses ",Object(a.b)("a",{href:"https://www.npmjs.com/package/dotenv",parentName:"p"},Object(a.b)("inlineCode",{parentName:"a"},"dotenv"))," package. To change the default configuration, create ",Object(a.b)("inlineCode",{parentName:"p"},".env")," file in service's root to set the default environment variables:"),Object(a.b)("pre",null,Object(a.b)("code",{className:"language-sh",parentName:"pre"},'$ pwd\n/Users/agoldis/sorry-cypress/packages/director\n\n$ cat .env\n\nPORT=1234\n\n# DASHBOARD_URL is what Cypress client shows as a "Run URL"\nDASHBOARD_URL="https://sorry-cypress.herokuapp.com"\n\n# Path the the execution driver\nEXECUTION_DRIVER="../execution/in-memory"\n\n# Path the the storage driver\nSCREENSHOTS_DRIVER="../screenshots/dummy.driver"\n\n# Read more about record keys whitelist below\nALLOWED_KEYS="my_secret_key,my_another_secret_key"\n')),Object(a.b)("p",null,"Setting ",Object(a.b)("inlineCode",{parentName:"p"},"ALLOWED_KEYS")," variable allows you to define list of comma delimited record keys (provided to the Cypress Runner using ",Object(a.b)("inlineCode",{parentName:"p"},"--key")," option) which are accepted by the ",Object(a.b)("inlineCode",{parentName:"p"},"director")," service. This can be useful when Cypress is running on external CI servers and we need to expose ",Object(a.b)("inlineCode",{parentName:"p"},"director")," to the internet."),Object(a.b)("p",null,"Empty or not provided variable means that all record keys are allowed."))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/director/index.mdx"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-director-index-mdx-d0a09a25cbb89ca3c813.js.map